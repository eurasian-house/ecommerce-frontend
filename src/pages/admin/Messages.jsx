import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import "../../styles/components/Messages.css";


const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

function formatTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const daysAgo = Math.floor(
    (startOfToday.getTime() - startOfDate.getTime()) /
    86400000
  );

  if (daysAgo === 0) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (daysAgo === 1) {
    return "Yesterday";
  }

  if (daysAgo < 7 && daysAgo > 1) {
    return date.toLocaleDateString([], {
      weekday: "long",
    });
  }

  return date.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year:
      date.getFullYear() === now.getFullYear()
        ? undefined
        : "numeric",
  });
}

function initials(name) {
  return (name || "Guest")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

async function chatRequest(path, options = {}) {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured.");
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;

  const token = data.session?.access_token;

  if (!token) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || "Unable to connect to chat.");
  }

  return result;
}

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const [enablingNotifications, setEnablingNotifications] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");

  const lastReadMessageRef = useRef({});

  const totalUnread = conversations.reduce(
    (total, conversation) =>
      total + (Number(conversation.admin_unread_count) || 0),
    0
  );


  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
  );

  const loadConversations = useCallback(async (showError = false) => {
    try {
      const result = await chatRequest(
        "/api/chat/admin/conversations"
      );

      setConversations(result.conversations || []);

      setActiveConversationId((currentId) => {
        if (
          currentId &&
          result.conversations?.some((item) => item.id === currentId)
        ) {
          return currentId;
        }

        return result.conversations?.[0]?.id || null;
      });

      if (showError) setError("");
    } catch (err) {
      if (showError) {
        setError(err.message || "Could not load conversations.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const markConversationRead = useCallback(async (conversationId) => {
    if (!conversationId) return;

    try {
      await chatRequest(
        `/api/chat/admin/conversations/${conversationId}/read`,
        {
          method: "POST",
          body: JSON.stringify({}),
        }
      );

      // Update the UI immediately after the server confirms success.
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, admin_unread_count: 0 }
            : conversation
        )
      );

      // Reload the authoritative count from the database.
      await loadConversations();
    } catch (err) {
      console.error("Mark conversation as read failed:", err);
      setError(`Could not mark messages as read: ${err.message}`);
    }
  }, [loadConversations]);

  useEffect(() => {
    loadConversations(true);

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        loadConversations();
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [loadConversations]);

  const loadMessages = useCallback(async (conversationId, showError = false) => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    try {
      const result = await chatRequest(
        `/api/chat/conversations/${conversationId}/messages`
      );

      setMessages(result.messages || []);

      if (showError) setError("");
    } catch (err) {
      if (showError) {
        setError(err.message || "Could not load messages.");
      }
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }

    let cancelled = false;

    async function refresh() {
      if (!cancelled) {
        await loadMessages(activeConversationId, true);
      }
    }

    setMessages([]);
    setMessagesLoading(true);

    async function openConversation() {
      await markConversationRead(activeConversationId);
      await refresh();
    }

    openConversation();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible" && !cancelled) {
        loadMessages(activeConversationId);
      }
    }, 3000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [activeConversationId, loadMessages, markConversationRead]);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return conversations;

    return conversations.filter((conversation) => {
      const searchable = [
        conversation.customer_name,
        conversation.customer_email,
        conversation.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [conversations, search]);

  async function handleReply(event) {
    event.preventDefault();

    const text = reply.trim();

    if (!text || !activeConversationId || sending) return;

    if (text.length > 4000) {
      setError("Messages cannot exceed 4,000 characters.");
      return;
    }

    if (activeConversation?.status === "closed") {
      setError("This conversation is closed.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const result = await chatRequest(
        `/api/chat/conversations/${activeConversationId}/messages`,
        {
          method: "POST",
          body: JSON.stringify({ message: text }),
        }
      );

      setMessages((current) => {
        if (current.some((item) => item.id === result.message.id)) {
          return current;
        }

        return [...current, result.message];
      });

      setReply("");
      await loadConversations();
    } catch (err) {
      setError(err.message || "Could not send your reply.");
    } finally {
      setSending(false);
    }
  }

  const openCount = conversations.filter(
    (conversation) => conversation.status === "open"
  ).length;


  async function enableNotifications() {
    setEnablingNotifications(true);
    setNotificationStatus("");

    try {
      // This feature is intended for your Android phone.
      if (!/Android/i.test(navigator.userAgent)) {
        throw new Error(
          "Please open the admin page in Chrome on your Android phone."
        );
      }

      if (
        !window.isSecureContext ||
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !("Notification" in window)
      ) {
        throw new Error(
          "Push notifications require HTTPS and a supported browser."
        );
      }

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        throw new Error(
          "Notifications were not allowed. Enable them in Chrome settings."
        );
      }

      // Register the service worker.
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );

      await navigator.serviceWorker.ready;

      // Retrieve the public VAPID key from your backend.
      const keyResponse = await fetch(
        `${API_URL}/api/chat/push/public-key`
      );

      const keyResult = await keyResponse.json();

      if (!keyResponse.ok || !keyResult.publicKey) {
        throw new Error(
          keyResult.error || "Could not retrieve the push public key."
        );
      }

      // Convert the URL-safe Base64 VAPID key.
      function decodeVapidKey(base64String) {
        const padding = "=".repeat(
          (4 - (base64String.length % 4)) % 4
        );

        const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        const raw = window.atob(base64);

        return Uint8Array.from(raw, (character) =>
          character.charCodeAt(0)
        );
      }

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: decodeVapidKey(
            keyResult.publicKey
          ),
        });
      }

      // Authenticate with your existing Supabase session.
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      const accessToken = data.session?.access_token;

      if (!accessToken) {
        throw new Error(
          "Please sign in to your admin account again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/chat/push/admin-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            subscription: subscription.toJSON(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Could not save your push subscription."
        );
      }

      setNotificationStatus(
        "Notifications enabled on this phone."
      );
    } catch (error) {
      setNotificationStatus(
        error.message || "Could not enable notifications."
      );
    } finally {
      setEnablingNotifications(false);
    }
  }


  return (
    <div className="messages-page">
      <div className="container-fluid p-0">
        <header className="messages-heading d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div className="messages-heading__intro">
            <div className="messages-eyebrow mb-2">
              EURASIAN HOUSE · SUPPORT
            </div>

            <h2 className="messages-heading__title mb-2">
              Customer conversations
            </h2>

            <p className="messages-heading__description mb-0">
              A personal touch, one conversation at a time.
            </p>
          </div>

          <div className="messages-overview">
            <div className="messages-overview__indicator" />

            <div className="messages-overview__content">
              <div className="messages-overview__count">
                {openCount}
              </div>

              <div className="messages-overview__label">
                Open conversations
              </div>

              <div
                className={`messages-overview__unread ${totalUnread > 0 ? "has-unread" : ""
                  }`}
              >
                {totalUnread} unread message
                {totalUnread === 1 ? "" : "s"}
              </div>
            </div>

            <button
              type="button"
              onClick={enableNotifications}
              disabled={enablingNotifications}
              className="messages-button messages-button--primary messages-notification-button"
            >
              <i className="bi bi-bell" />
              {enablingNotifications
                ? "Enabling..."
                : "Enable notifications"}
            </button>
          </div>
        </header>

        {notificationStatus && (
          <p
            role="status"
            className={`messages-notification-status ${notificationStatus.startsWith("Notifications enabled")
              ? "is-success"
              : "is-error"
              }`}
          >
            {notificationStatus}
          </p>
        )}

        {error && (
          <div
            role="alert"
            className="messages-alert d-flex justify-content-between align-items-center gap-3 mb-3"
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="messages-alert__close"
              aria-label="Dismiss error"
            >
              &times;
            </button>
          </div>
        )}

        <div className="row g-3 messages-layout">
          {/* Conversation sidebar */}
          <div
            className={`col-12 col-lg-4 col-xl-4 messages-inbox-column ${mobileChatOpen ? "mobile-hidden" : ""
              }`}
          >
            <section className="messages-panel messages-inbox">
              <header className="messages-panel__header d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="messages-panel__title mb-1">
                    Inbox
                  </h5>

                  <div className="messages-muted messages-panel__subtitle">
                    {conversations.length} conversations
                  </div>
                </div>

                {/* <button
                  type="button"
                  title="Refresh inbox"
                  aria-label="Refresh inbox"
                  onClick={() => loadConversations(true)}
                  className="messages-icon-button"
                >
                  <i className="bi bi-arrow-clockwise" />
                </button> */}
              </header>

              <div className="messages-search">
                <i className="bi bi-search messages-search__icon" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, email or ID..."
                  aria-label="Search conversations"
                  className="messages-input messages-search__input"
                />
              </div>

              <div className="messages-conversation-list">
                {loading ? (
                  <div className="messages-empty messages-loading">
                    <span className="messages-spinner" />
                    Loading conversations...
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="messages-empty">
                    <i className="bi bi-chat-square-text messages-empty__icon" />

                    <p className="messages-empty__title mt-3 mb-1">
                      {search
                        ? "No matching conversations"
                        : "Your inbox is peaceful"}
                    </p>

                    <p className="messages-empty__description mb-0">
                      {search
                        ? "Try another search."
                        : "Customer messages will appear here."}
                    </p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => {
                    const selected =
                      conversation.id === activeConversationId;

                    const customerName =
                      conversation.customer_name || "Anonymous visitor";

                    return (
                      <button
                        type="button"
                        key={conversation.id}
                        onClick={() => {
                          setActiveConversationId(conversation.id);
                          setError("");
                          setMobileChatOpen(true);
                        }}
                        className={`messages-conversation ${selected ? "is-selected" : ""
                          }`}
                        aria-current={selected ? "true" : undefined}
                      >
                        <div className="messages-avatar">
                          {initials(customerName)}
                        </div>

                        <div className="messages-conversation__content">
                          <div className="messages-conversation__top">
                            <span className="messages-conversation__name">
                              {customerName}
                            </span>

                            <span className="messages-timestamp">
                              {formatTime(conversation.last_message_at)}
                            </span>

                            {Number(conversation.admin_unread_count) > 0 && (
                              <span
                                title={`${conversation.admin_unread_count} unread messages`}
                                className="messages-unread-badge"
                              >
                                {conversation.admin_unread_count}
                              </span>
                            )}
                          </div>

                          {/* <div className="messages-conversation__email">
                            {conversation.customer_email || "Guest customer"}
                          </div> */}
                          <div
                            className="messages-conversation__email messages-conversation__preview"
                            title={conversation.last_message || ""}
                          >
                            {conversation.last_message || "No messages yet"}
                          </div>

                          {/* <div className="messages-conversation__bottom">
                            <span
                              className={`messages-status ${conversation.status === "open"
                                ? "is-open"
                                : "is-closed"
                                }`}
                            >
                              {conversation.status === "open"
                                ? "Open"
                                : "Closed"}
                            </span>

                            <span className="messages-conversation__id">
                              ID · {conversation.id.slice(0, 8)}
                            </span>
                          </div> */}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              <footer className="messages-panel__footer">
                <i className="bi bi-shield-check me-2" />
                Private customer conversations
              </footer>
            </section>
          </div>

          {/* Active conversation */}
          <div
            className={`col-12 col-lg-8 col-xl-8 messages-chat-column ${mobileChatOpen ? "mobile-chat-active" : "mobile-hidden"
              }`}
          >
            <section className="messages-panel messages-chat">
              {!activeConversation ? (
                <div className="messages-welcome">
                  <div className="messages-welcome__icon">
                    <i className="bi bi-chat-left-text" />
                  </div>

                  <h5 className="messages-welcome__title">
                    Every conversation matters
                  </h5>

                  <p className="messages-welcome__description">
                    Select a customer from your inbox to read their messages
                    and reply personally.
                  </p>
                </div>
              ) : (
                <>
                  <header className="messages-chat__header">
                    <button
                      type="button"
                      className="messages-back-button"
                      onClick={() => setMobileChatOpen(false)}
                      aria-label="Back to inbox"
                    >
                      <i className="bi bi-arrow-left" />
                    </button>
                    <div className="messages-chat__customer">
                      <div className="messages-avatar messages-avatar--large">
                        {initials(activeConversation.customer_name || "Guest")}
                      </div>

                      <div className="messages-chat__customer-info">
                        <h5 className="messages-chat__customer-name mb-1">
                          {activeConversation.customer_name ||
                            "Anonymous visitor"}
                        </h5>

                        <div className="messages-chat__customer-email">
                          {activeConversation.customer_email ||
                            "No email provided"}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`messages-status messages-status--large ${activeConversation.status === "open"
                        ? "is-open"
                        : "is-closed"
                        }`}
                    >
                      {activeConversation.status === "open"
                        ? "● Open"
                        : "Closed"}
                    </span>
                  </header>

                  <div className="messages-history">
                    <div className="messages-history__start">
                      <span>
                        Conversation started{" "}
                        {formatTime(activeConversation.created_at)}
                      </span>
                    </div>

                    {messagesLoading && messages.length === 0 && (
                      <div className="messages-empty messages-loading">
                        <span className="messages-spinner" />
                        Loading messages...
                      </div>
                    )}

                    {!messagesLoading && messages.length === 0 && (
                      <div className="messages-empty">
                        No messages in this conversation.
                      </div>
                    )}

                    {messages.map((item) => {
                      const isAdmin = item.sender_type === "admin";

                      return (
                        <div
                          key={item.id}
                          className={`messages-message ${isAdmin ? "is-admin" : "is-customer"
                            }`}
                        >
                          <div className="messages-message__body">
                            <div className="messages-message__sender">
                              {isAdmin
                                ? "You · Eurasian House"
                                : activeConversation.customer_name || "Customer"}
                            </div>

                            <div className="messages-bubble">
                              {item.message}
                            </div>

                            <div className="messages-message__time">
                              {formatTime(item.created_at)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="messages-composer">
                    {activeConversation.status === "closed" ? (
                      <div className="messages-composer__closed">
                        This conversation is closed.
                      </div>
                    ) : (
                      <form onSubmit={handleReply}>
                        <textarea
                          value={reply}
                          onChange={(event) => setReply(event.target.value)}
                          placeholder="Write a thoughtful reply..."
                          maxLength={4000}
                          rows={3}
                          aria-label="Write your reply"
                          className="messages-input messages-reply-input"
                        />

                        <div className="messages-composer__footer">
                          <span className="messages-composer__hint">
                            <i className="bi bi-chat-dots me-1" />
                            Text-only support
                          </span>

                          <button
                            type="submit"
                            disabled={sending || !reply.trim()}
                            className="messages-button messages-button--primary"
                          >
                            <i className="bi bi-send" />
                            {sending ? "Sending..." : "Send reply"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  <footer className="messages-chat__footer">
                    EURASIAN HOUSE · CUSTOMER CARE
                  </footer>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
