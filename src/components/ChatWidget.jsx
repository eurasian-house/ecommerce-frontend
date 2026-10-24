import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    findExistingConversation,
    getChatMessages,
    sendChatMessage,
    sendFirstChatMessage,
} from "../lib/chatApi";
import "../styles/components/ChatWidget.css";

export default function ChatWidget() {
    const { user, isAdmin, loading: authLoading } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [initializing, setInitializing] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const messagesEndRef = useRef(null);
    const conversationRef = useRef(null);
    const sendingRef = useRef(false);
    const textareaRef = useRef(null);

    const loadMessages = useCallback(async (id, showError = false) => {
        if (!id) return;

        try {
            const result = await getChatMessages(id);

            setMessages((current) => {
                const byId = new Map(current.map((item) => [item.id, item]));
                result.forEach((item) => byId.set(item.id, item));

                return Array.from(byId.values()).sort(
                    (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                );
            });

            if (showError) setError("");
        } catch (err) {
            if (showError) {
                setError(err.message || "Unable to load messages.");
            }
        }
    }, []);

    useEffect(() => {
        if (authLoading || isAdmin) return;

        let cancelled = false;

        async function initialize() {
            setInitializing(true);
            setError("");

            conversationRef.current = null;
            setConversationId(null);
            setMessages([]);

            try {
                const id = await findExistingConversation();
                if (cancelled) return;

                conversationRef.current = id;
                setConversationId(id);

                if (id) {
                    await loadMessages(id, true);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message || "Unable to load your previous chat."
                    );
                }
            } finally {
                if (!cancelled) setInitializing(false);
            }
        }

        initialize();

        return () => {
            cancelled = true;
        };
    }, [authLoading, user?.id, isAdmin, loadMessages]);

    useEffect(() => {
        if (authLoading || isAdmin || !conversationId) return;

        const pollId = window.setInterval(() => {
            if (document.visibilityState === "visible") {
                loadMessages(conversationId);
            }
        }, 3000);

        return () => window.clearInterval(pollId);
    }, [authLoading, isAdmin, conversationId, loadMessages]);

    useEffect(() => {
        if (!isOpen) return;

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const frame = window.requestAnimationFrame(() => {
            textareaRef.current?.focus({ preventScroll: true });
        });

        return () => window.cancelAnimationFrame(frame);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    async function handleSubmit(event) {
        event.preventDefault();

        const text = message.trim();

        if (!text || sendingRef.current || initializing) return;

        if (text.length > 4000) {
            setError("Messages must be 4,000 characters or fewer.");
            return;
        }

        sendingRef.current = true;
        setSending(true);
        setError("");

        try {
            let id = conversationRef.current;
            let sentMessage;

            if (!id) {
                const result = await sendFirstChatMessage(text);
                id = result.conversation.id;
                sentMessage = result.message;

                conversationRef.current = id;
                setConversationId(id);
            } else {
                sentMessage = await sendChatMessage(id, text);
            }

            setMessages((current) => {
                if (current.some((item) => item.id === sentMessage.id)) {
                    return current;
                }

                return [...current, sentMessage].sort(
                    (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                );
            });

            setMessage("");
        } catch (err) {
            setError(err.message || "Unable to send your message.");
        } finally {
            sendingRef.current = false;
            setSending(false);
        }
    }

    function formatTime(value) {
        return new Date(value).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function formatDate(value) {
        const date = new Date(value);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const sameDay = (a, b) =>
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();

        if (sameDay(date, today)) return "Today";
        if (sameDay(date, yesterday)) return "Yesterday";

        return date.toLocaleDateString([], {
            day: "numeric",
            month: "short",
            year: date.getFullYear() === today.getFullYear()
                ? undefined
                : "numeric",
        });
    }

    if (authLoading || isAdmin) return null;

    let previousDate = "";

    return (
        <div className={`eh-chat ${isOpen ? "eh-chat--open" : ""}`}>
            {isOpen && (
                <section
                    className="eh-chat__panel"
                    aria-label="Eurasian House customer support"
                    aria-busy={initializing || sending}
                >
                    <header className="eh-chat__header">
                        <div className="eh-chat__brand">
                            <div className="eh-chat__avatar" aria-hidden="true">
                                <svg viewBox="0 0 32 32" fill="none">
                                    <path
                                        d="M7 7h18v18H7z"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    />
                                    <path
                                        d="M11 12h10M11 16h10M11 20h6"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <div className="eh-chat__brand-copy">
                                <span className="eh-chat__eyebrow">
                                    EURASIAN HOUSE CHAT
                                </span>
                                <h2>We're here to help</h2>
                                <p className="eh-chat__header-links">
                                    <span className="eh-chat__status-dot" />
                                    Customer care
                                    <span className="eh-chat__header-divider">·</span>
                                    <a
                                        href="https://wa.me/917080012972"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Chat with us on WhatsApp"
                                    >
                                        WhatsApp
                                    </a>
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="eh-chat__close"
                            aria-label="Close chat"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg viewBox="0 0 24 24" fill="none">
                                <path
                                    d="m6 6 12 12M18 6 6 18"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </header>

                    <div
                        className="eh-chat__messages"
                        aria-live="polite"
                        aria-relevant="additions"
                    >
                        <div className="eh-chat__intro">
                            <div className="eh-chat__intro-icon">
                                <svg viewBox="0 0 32 32" fill="none">
                                    <path
                                        d="M16 4 27 10v12l-11 6L5 22V10L16 4Z"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="m10 13 6-3 6 3v6l-6 3-6-3v-6Z"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                    />
                                </svg>
                            </div>
                            <h3>A little help goes a long way.</h3>
                            <p>
                                Questions about rugs, sizing, orders or delivery?
                                Send us a message. We'd love to help.
                            </p>
                            <span className="eh-chat__intro-note">
                                Your conversation stays right here.
                            </span>
                        </div>

                        {initializing && (
                            <div className="eh-chat__loading">
                                <span />
                                <span />
                                <span />
                                <p>Preparing your conversation…</p>
                            </div>
                        )}

                        {!initializing && messages.length === 0 && !error && (
                            <div className="eh-chat__welcome">
                                <span className="eh-chat__welcome-line" />
                                <p>
                                    Start a conversation whenever you're ready.
                                </p>
                            </div>
                        )}

                        {messages.map((item) => {
                            const dateLabel = formatDate(item.created_at);
                            const showDate = dateLabel !== previousDate;
                            previousDate = dateLabel;

                            const isAdminMessage = item.sender_type === "admin";

                            return (
                                <div
                                    key={item.id}
                                    className="eh-chat__message-group"
                                >
                                    {showDate && (
                                        <div className="eh-chat__date">
                                            <span>{dateLabel}</span>
                                        </div>
                                    )}

                                    <div
                                        className={`eh-chat__message ${isAdminMessage
                                            ? "eh-chat__message--admin"
                                            : "eh-chat__message--customer"
                                            }`}
                                    >
                                        {isAdminMessage && (
                                            <div
                                                className="eh-chat__message-avatar"
                                                aria-hidden="true"
                                            >
                                                E
                                            </div>
                                        )}

                                        <div className="eh-chat__bubble">
                                            <span className="eh-chat__sender">
                                                {isAdminMessage
                                                    ? "Eurasian House"
                                                    : "You"}
                                            </span>

                                            <p>{item.message}</p>

                                            <time dateTime={item.created_at}>
                                                {formatTime(item.created_at)}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div ref={messagesEndRef} />
                    </div>

                    {error && (
                        <div className="eh-chat__error" role="alert">
                            <span>{error}</span>
                            <button
                                type="button"
                                onClick={() => setError("")}
                                aria-label="Dismiss error"
                            >
                                &times;
                            </button>
                        </div>
                    )}

                    <form className="eh-chat__form" onSubmit={handleSubmit}>
                        <div className="eh-chat__composer">
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" &&
                                        !event.shiftKey &&
                                        !event.nativeEvent.isComposing
                                    ) {
                                        event.preventDefault();
                                        event.currentTarget.form?.requestSubmit();
                                    }
                                }}
                                placeholder="Write your message…"
                                aria-label="Your message"
                                maxLength={4000}
                                rows={2}
                                disabled={sending || initializing}
                            />

                            <div className="eh-chat__composer-bottom">
                                <span className="eh-chat__hint">
                                    Enter to send · Shift + Enter for a new line
                                </span>
                                <span className="eh-chat__counter">
                                    {message.length}/4000
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="eh-chat__send"
                            disabled={
                                sending ||
                                initializing ||
                                !message.trim()
                            }
                            aria-label="Send message"
                        >
                            {sending ? (
                                <span className="eh-chat__send-spinner" />
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M21 3 10 14"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="m21 3-7 18-4-7-7-4 18-7Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                    </form>

                    <footer className="eh-chat__footer">
                        <span className="eh-chat__footer-lock">
                            <svg viewBox="0 0 20 20" fill="none">
                                <rect
                                    x="4.5"
                                    y="8"
                                    width="11"
                                    height="8"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                />
                                <path
                                    d="M7 8V5.8a3 3 0 0 1 6 0V8"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                        <span>Made with care by Eurasian House</span>
                    </footer>
                </section>
            )}

            <button
                type="button"
                className={`eh-chat__launcher ${isOpen ? "eh-chat__launcher--open" : ""
                    }`}
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close customer chat" : "Open customer chat"}
                aria-expanded={isOpen}
            >
                <span className="eh-chat__launcher-icon">
                    {isOpen ? (
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="m6 6 12 12M18 6 6 18"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-2 2v-6a7.5 7.5 0 1 1 17-3.5Z"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 11h8M8 14h5"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                </span>
                {!isOpen && <span className="eh-chat__launcher-pulse" />}
            </button>
        </div>
    );
}
