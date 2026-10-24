import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    findExistingConversation,
    getOrCreateConversation,
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

    // Load messages and merge them without adding duplicates.
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

    // Find an existing conversation without creating a new one.
    useEffect(() => {
        if (authLoading || isAdmin) return;

        let cancelled = false;

        async function initialize() {
            setInitializing(true);
            setError("");

            try {
                const id = await findExistingConversation();

                if (cancelled) return;

                conversationRef.current = id;
                setConversationId(id);

                if (id) {
                    await loadMessages(id, true);
                } else {
                    setMessages([]);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message || "Unable to load your previous chat."
                    );
                }
            } finally {
                if (!cancelled) {
                    setInitializing(false);
                }
            }
        }

        // Reset the current conversation when the authenticated user changes.
        conversationRef.current = null;
        setConversationId(null);
        setMessages([]);

        initialize();

        return () => {
            cancelled = true;
        };
    }, [authLoading, user?.id, isAdmin, loadMessages]);

    // Poll existing conversations for new admin replies.
    useEffect(() => {
        if (authLoading || isAdmin || !conversationId) return;

        const pollId = window.setInterval(() => {
            if (document.visibilityState === "visible") {
                loadMessages(conversationId);
            }
        }, 3000);

        return () => window.clearInterval(pollId);
    }, [authLoading, isAdmin, conversationId, loadMessages]);

    // Scroll to the newest message while the widget is open.
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages, isOpen]);

    // Create a conversation only when the visitor sends their first message.

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
                // First message: create the conversation and message atomically.
                const result = await sendFirstChatMessage(text);

                id = result.conversation.id;
                sentMessage = result.message;

                conversationRef.current = id;
                setConversationId(id);
            } else {
                // Existing conversation: send the message normally.
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


    if (authLoading || isAdmin) return null;

    return (
        <div className="eh-chat">
            {isOpen && (
                <section
                    className="eh-chat__panel"
                    aria-label="Customer support chat"
                >
                    <header className="eh-chat__header">
                        <div>
                            <h2>Chat with us</h2>
                            <p>We're here to help with your rug orders.</p>
                        </div>

                        <button
                            type="button"
                            className="eh-chat__close"
                            aria-label="Close chat"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </header>

                    <div className="eh-chat__messages" aria-live="polite">
                        {initializing && messages.length === 0 && (
                            <p className="eh-chat__notice">
                                Loading chat…
                            </p>
                        )}

                        {!initializing &&
                            messages.length === 0 &&
                            !error && (
                                <div className="eh-chat__welcome">
                                    <strong>Welcome to Eurasian House!</strong>
                                    <p>
                                        Send us a message and our team will get
                                        back to you.
                                    </p>
                                </div>
                            )}

                        {messages.map((item) => (
                            <div
                                key={item.id}
                                className={`eh-chat__message ${item.sender_type === "admin"
                                    ? "eh-chat__message--admin"
                                    : "eh-chat__message--customer"
                                    }`}
                            >
                                <span className="eh-chat__sender">
                                    {item.sender_type === "admin"
                                        ? "Eurasian House"
                                        : "You"}
                                </span>

                                <p>{item.message}</p>

                                <time dateTime={item.created_at}>
                                    {new Date(
                                        item.created_at
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </time>
                            </div>
                        ))}

                        <div ref={messagesEndRef} />
                    </div>

                    {error && (
                        <p className="eh-chat__error" role="alert">
                            {error}
                        </p>
                    )}

                    <form className="eh-chat__form" onSubmit={handleSubmit}>
                        <textarea
                            value={message}
                            onChange={(event) =>
                                setMessage(event.target.value)
                            }
                            placeholder="Type your message..."
                            aria-label="Your message"
                            maxLength={4000}
                            rows={2}
                            disabled={sending || initializing}
                        />

                        <button
                            type="submit"
                            disabled={
                                sending ||
                                initializing ||
                                !message.trim()
                            }
                        >
                            {sending ? "Sending…" : "Send"}
                        </button>
                    </form>

                    <div className="eh-chat__footer">
                        Customer support · Text messages only
                    </div>
                </section>
            )}

            <button
                type="button"
                className={`eh-chat__launcher ${isOpen ? "eh-chat__launcher--open" : ""
                    }`}
                onClick={() => setIsOpen((open) => !open)}
                aria-label={
                    isOpen ? "Close customer chat" : "Open customer chat"
                }
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <span className="eh-chat__launcher-symbol">&times;</span>
                ) : (
                    <svg
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-2 2v-6a7.5 7.5 0 1 1 17-3.5Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 11h8M8 14h5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}