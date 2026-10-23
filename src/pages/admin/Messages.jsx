
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

const palette = {
  page: "#FAF8F5",
  surface: "#FFFFFF",
  cream: "#F3EEE5",
  border: "#E8E1D6",
  text: "#292820",
  muted: "#898579",
  accent: "#71664F",
  accentDark: "#504735",
  customerBubble: "#F3F0EA",
  adminBubble: "#EAE4D8",
  green: "#52745A",
  danger: "#A34E42",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: palette.page,
    color: palette.text,
    padding: "28px",
  },
  card: {
    background: palette.surface,
    border: `1px solid ${palette.border}`,
    borderRadius: "16px",
    overflow: "hidden",
  },
  input: {
    background: palette.page,
    border: `1px solid ${palette.border}`,
    borderRadius: "10px",
    padding: "11px 14px",
    fontSize: "13px",
    color: palette.text,
    outline: "none",
    width: "100%",
  },
  iconButton: {
    border: `1px solid ${palette.border}`,
    background: palette.surface,
    color: palette.text,
    borderRadius: "10px",
    width: "38px",
    height: "38px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

function formatTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
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

  const [enablingNotifications, setEnablingNotifications] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");

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
    refresh();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible" && !cancelled) {
        loadMessages(activeConversationId);
      }
    }, 3000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [activeConversationId, loadMessages]);

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
    <div style={styles.page}>
      <div className="container-fluid p-0">

        {/* Page heading */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <div
              className="text-uppercase mb-2"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: palette.accent,
                fontWeight: 700,
              }}
            >
              EURASIAN HOUSE · SUPPORT
            </div>

            <h2
              className="mb-2"
              style={{
                fontSize: "clamp(24px, 3vw, 30px)",
                fontWeight: 650,
                letterSpacing: "-0.8px",
                color: palette.text,
              }}
            >
              Customer conversations
            </h2>

            <p
              className="mb-0"
              style={{ fontSize: "13px", color: palette.muted }}
            >
              A personal touch, one conversation at a time.
            </p>
          </div>

          <div
            className="d-flex align-items-center gap-3"
            style={{
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: "12px",
              padding: "12px 16px",
            }}
          >
            <div
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: palette.green,
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 650,
                  lineHeight: 1.2,
                }}
              >
                {openCount}
              </div>

              <button
                type="button"
                onClick={enableNotifications}
                disabled={enablingNotifications}
                className="d-inline-flex align-items-center gap-2"
                style={{
                  border: 0,
                  borderRadius: "10px",
                  padding: "12px 16px",
                  background: "#504735",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: enablingNotifications ? "wait" : "pointer",
                  opacity: enablingNotifications ? 0.7 : 1,
                }}
              >
                <i className="bi bi-bell" />
                {enablingNotifications
                  ? "Enabling..."
                  : "Enable notifications"}
              </button>

              <div
                style={{
                  fontSize: "10px",
                  color: palette.muted,
                }}
              >
                Open conversations
              </div>
            </div>
          </div>
        </div>


        {notificationStatus && (
          <p
            role="status"
            style={{
              marginTop: "12px",
              fontSize: "12px",
              color: notificationStatus.startsWith("Notifications enabled")
                ? "#52745A"
                : "#A34E42",
            }}
          >
            {notificationStatus}
          </p>
        )}


        {error && (
          <div
            role="alert"
            className="d-flex justify-content-between align-items-center gap-3 mb-3"
            style={{
              padding: "12px 15px",
              background: "#F8EAE6",
              color: palette.danger,
              border: "1px solid #EBD1C9",
              borderRadius: "10px",
              fontSize: "13px",
            }}
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              style={{
                border: 0,
                background: "transparent",
                color: "inherit",
                fontSize: "20px",
              }}
            >
              &times;
            </button>
          </div>
        )}

        {/* Inbox layout */}
        <div
          className="row g-3"
          style={{ minHeight: "650px" }}
        >
          {/* Conversation sidebar */}
          <div className="col-12 col-lg-4 col-xl-4">
            <div
              style={{
                ...styles.card,
                height: "100%",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="d-flex justify-content-between align-items-center"
                style={{
                  padding: "20px 20px 16px",
                  borderBottom: `1px solid ${palette.border}`,
                }}
              >
                <div>
                  <h5
                    className="mb-1"
                    style={{
                      fontSize: "15px",
                      fontWeight: 650,
                    }}
                  >
                    Inbox
                  </h5>
                  <div
                    style={{
                      fontSize: "11px",
                      color: palette.muted,
                    }}
                  >
                    {conversations.length} conversations
                  </div>
                </div>

                <button
                  type="button"
                  title="Refresh inbox"
                  onClick={() => loadConversations(true)}
                  style={styles.iconButton}
                >
                  <i className="bi bi-arrow-clockwise" />
                </button>
              </div>

              <div style={{ padding: "14px 14px 10px" }}>
                <div style={{ position: "relative" }}>
                  <i
                    className="bi bi-search"
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: palette.muted,
                      fontSize: "13px",
                    }}
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search name, email or ID..."
                    aria-label="Search conversations"
                    style={{
                      ...styles.input,
                      paddingLeft: "36px",
                    }}
                  />
                </div>
              </div>

              <div style={{ flex: 1, overflowY: "auto" }}>
                {loading ? (
                  <div
                    className="text-center py-5"
                    style={{
                      fontSize: "13px",
                      color: palette.muted,
                    }}
                  >
                    Loading conversations...
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div
                    className="text-center px-4 py-5"
                    style={{ color: palette.muted }}
                  >
                    <i
                      className="bi bi-chat-square-text"
                      style={{
                        fontSize: "30px",
                        color: palette.accent,
                      }}
                    />
                    <p
                      className="mt-3 mb-1"
                      style={{
                        color: palette.text,
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      {search
                        ? "No matching conversations"
                        : "Your inbox is peaceful"}
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "12px" }}
                    >
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
                      conversation.customer_name ||
                      "Anonymous visitor";

                    return (
                      <button
                        type="button"
                        key={conversation.id}
                        onClick={() => {
                          setActiveConversationId(
                            conversation.id
                          );
                          setError("");
                        }}
                        className="w-100 text-start"
                        style={{
                          display: "flex",
                          gap: "12px",
                          padding: "16px",
                          border: 0,
                          borderBottom: `1px solid ${palette.border}`,
                          borderLeft: selected
                            ? `3px solid ${palette.accent}`
                            : "3px solid transparent",
                          background: selected
                            ? palette.cream
                            : palette.surface,
                          cursor: "pointer",
                          transition: "background .15s ease",
                        }}
                      >
                        <div
                          style={{
                            flexShrink: 0,
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: selected
                              ? palette.accent
                              : palette.cream,
                            color: selected
                              ? "#FFFFFF"
                              : palette.accentDark,
                            fontSize: "13px",
                            fontWeight: 650,
                          }}
                        >
                          {initials(customerName)}
                        </div>

                        <div
                          style={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <div
                            className="d-flex justify-content-between align-items-center gap-2"
                            style={{ marginBottom: "5px" }}
                          >
                            <span
                              className="text-truncate"
                              style={{
                                fontSize: "13px",
                                fontWeight: selected
                                  ? 700
                                  : 600,
                                color: palette.text,
                              }}
                            >
                              {customerName}
                            </span>

                            <span
                              style={{
                                flexShrink: 0,
                                fontSize: "10px",
                                color: palette.muted,
                              }}
                            >
                              {formatTime(
                                conversation.last_message_at
                              )}
                            </span>
                          </div>

                          <div
                            className="text-truncate"
                            style={{
                              fontSize: "11px",
                              color: palette.muted,
                              marginBottom: "8px",
                            }}
                          >
                            {conversation.customer_email ||
                              "Guest customer"}
                          </div>

                          <div className="d-flex justify-content-between align-items-center gap-2">
                            <span
                              style={{
                                fontSize: "10px",
                                color:
                                  conversation.status ===
                                    "open"
                                    ? palette.green
                                    : palette.muted,
                                background:
                                  conversation.status ===
                                    "open"
                                    ? "#EDF2EB"
                                    : "#F0EFEC",
                                borderRadius: "20px",
                                padding: "4px 8px",
                              }}
                            >
                              {conversation.status ===
                                "open"
                                ? "Open"
                                : "Closed"}
                            </span>

                            <span
                              style={{
                                fontSize: "9px",
                                color: palette.muted,
                              }}
                            >
                              ID · {conversation.id.slice(0, 8)}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              <div
                style={{
                  padding: "12px 16px",
                  background: palette.page,
                  borderTop: `1px solid ${palette.border}`,
                  color: palette.muted,
                  fontSize: "10px",
                }}
              >
                <i className="bi bi-shield-check me-2" />
                Private customer conversations
              </div>
            </div>
          </div>

          {/* Active conversation */}
          <div className="col-12 col-lg-8 col-xl-8">
            <div
              style={{
                ...styles.card,
                height: "100%",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!activeConversation ? (
                <div
                  className="d-flex flex-column justify-content-center align-items-center text-center p-4"
                  style={{ flex: 1, minHeight: "500px" }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: palette.cream,
                      color: palette.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      marginBottom: "20px",
                    }}
                  >
                    <i className="bi bi-chat-left-text" />
                  </div>

                  <h5
                    style={{
                      fontWeight: 650,
                      fontSize: "17px",
                    }}
                  >
                    Every conversation matters
                  </h5>

                  <p
                    style={{
                      color: palette.muted,
                      fontSize: "13px",
                      maxWidth: "300px",
                      lineHeight: 1.7,
                    }}
                  >
                    Select a customer from your inbox to read
                    their messages and reply personally.
                  </p>
                </div>
              ) : (
                <>
                  {/* Conversation header */}
                  <div
                    className="d-flex align-items-center justify-content-between gap-3"
                    style={{
                      padding: "18px 22px",
                      borderBottom: `1px solid ${palette.border}`,
                      background: palette.surface,
                    }}
                  >
                    <div
                      className="d-flex align-items-center gap-3"
                      style={{ minWidth: 0 }}
                    >
                      <div
                        style={{
                          flexShrink: 0,
                          width: "46px",
                          height: "46px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: palette.cream,
                          color: palette.accentDark,
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        {initials(
                          activeConversation.customer_name ||
                          "Guest"
                        )}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <h5
                          className="mb-1 text-truncate"
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          {activeConversation.customer_name ||
                            "Anonymous visitor"}
                        </h5>

                        <div
                          className="text-truncate"
                          style={{
                            color: palette.muted,
                            fontSize: "11px",
                          }}
                        >
                          {activeConversation.customer_email ||
                            "No email provided"}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        flexShrink: 0,
                        background:
                          activeConversation.status === "open"
                            ? "#EDF2EB"
                            : "#F0EFEC",
                        color:
                          activeConversation.status === "open"
                            ? palette.green
                            : palette.muted,
                        padding: "7px 11px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        fontWeight: 600,
                      }}
                    >
                      {activeConversation.status === "open"
                        ? "● Open"
                        : "Closed"}
                    </span>
                  </div>

                  {/* Message history */}
                  <div
                    style={{
                      flex: 1,
                      minHeight: "350px",
                      maxHeight: "calc(100vh - 370px)",
                      overflowY: "auto",
                      padding: "24px",
                      background: "#FDFCF9",
                    }}
                  >
                    <div className="text-center mb-4">
                      <span
                        style={{
                          display: "inline-block",
                          padding: "7px 12px",
                          borderRadius: "20px",
                          background: palette.cream,
                          color: palette.muted,
                          fontSize: "10px",
                        }}
                      >
                        Conversation started{" "}
                        {formatTime(
                          activeConversation.created_at
                        )}
                      </span>
                    </div>

                    {messagesLoading && messages.length === 0 && (
                      <div
                        className="text-center py-4"
                        style={{
                          fontSize: "12px",
                          color: palette.muted,
                        }}
                      >
                        Loading messages...
                      </div>
                    )}

                    {!messagesLoading &&
                      messages.length === 0 && (
                        <div
                          className="text-center py-5"
                          style={{
                            color: palette.muted,
                            fontSize: "12px",
                          }}
                        >
                          No messages in this conversation.
                        </div>
                      )}

                    {messages.map((item) => {
                      const isAdmin =
                        item.sender_type === "admin";

                      return (
                        <div
                          key={item.id}
                          className={`d-flex mb-4 ${isAdmin
                            ? "justify-content-end"
                            : "justify-content-start"
                            }`}
                        >
                          <div
                            style={{
                              maxWidth: "min(82%, 480px)",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "10px",
                                color: palette.muted,
                                marginBottom: "6px",
                                textAlign: isAdmin
                                  ? "right"
                                  : "left",
                              }}
                            >
                              {isAdmin
                                ? "You · Eurasian House"
                                : activeConversation.customer_name ||
                                "Customer"}
                            </div>

                            <div
                              style={{
                                padding: "13px 16px",
                                borderRadius: isAdmin
                                  ? "15px 15px 4px 15px"
                                  : "15px 15px 15px 4px",
                                background: isAdmin
                                  ? palette.adminBubble
                                  : palette.customerBubble,
                                color: palette.text,
                                fontSize: "13px",
                                lineHeight: 1.7,
                                whiteSpace: "pre-wrap",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {item.message}
                            </div>

                            <div
                              style={{
                                fontSize: "10px",
                                color: palette.muted,
                                marginTop: "6px",
                                textAlign: isAdmin
                                  ? "right"
                                  : "left",
                              }}
                            >
                              {formatTime(item.created_at)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reply composer */}
                  <div
                    style={{
                      padding: "16px 20px 12px",
                      borderTop: `1px solid ${palette.border}`,
                      background: palette.surface,
                    }}
                  >
                    {activeConversation.status === "closed" ? (
                      <div
                        className="text-center py-3"
                        style={{
                          fontSize: "12px",
                          color: palette.muted,
                        }}
                      >
                        This conversation is closed.
                      </div>
                    ) : (
                      <form onSubmit={handleReply}>
                        <textarea
                          value={reply}
                          onChange={(event) =>
                            setReply(event.target.value)
                          }
                          placeholder="Write a thoughtful reply..."
                          maxLength={4000}
                          rows={3}
                          aria-label="Write your reply"
                          style={{
                            ...styles.input,
                            resize: "vertical",
                            minHeight: "80px",
                            lineHeight: 1.6,
                            background: "#FDFCF9",
                          }}
                        />

                        <div className="d-flex justify-content-between align-items-center gap-3 mt-3">
                          <span
                            style={{
                              color: palette.muted,
                              fontSize: "10px",
                            }}
                          >
                            <i className="bi bi-chat-dots me-1" />
                            Text-only support
                          </span>

                          <button
                            type="submit"
                            disabled={
                              sending || !reply.trim()
                            }
                            className="d-inline-flex align-items-center gap-2"
                            style={{
                              border: 0,
                              borderRadius: "9px",
                              padding: "11px 19px",
                              background: palette.accentDark,
                              color: "#FFFFFF",
                              fontSize: "12px",
                              fontWeight: 600,
                              cursor:
                                sending || !reply.trim()
                                  ? "not-allowed"
                                  : "pointer",
                              opacity:
                                sending || !reply.trim()
                                  ? 0.55
                                  : 1,
                            }}
                          >
                            <i className="bi bi-send" />
                            {sending
                              ? "Sending..."
                              : "Send reply"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      padding: "8px",
                      background: palette.page,
                      color: palette.muted,
                      borderTop: `1px solid ${palette.border}`,
                      fontSize: "9px",
                    }}
                  >
                    EURASIAN HOUSE · CUSTOMER CARE
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
