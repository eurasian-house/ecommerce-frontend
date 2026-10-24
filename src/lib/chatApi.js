
import { supabase } from "./supabase";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const CONVERSATION_KEY = "eurasian-chat-conversation";
const VISITOR_TOKEN_KEY = "eurasian-chat-visitor-token";

function getVisitorToken() {
    let token = localStorage.getItem(VISITOR_TOKEN_KEY);

    if (!token) {
        const bytes = crypto.getRandomValues(new Uint8Array(32));
        token = Array.from(bytes)
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");

        localStorage.setItem(VISITOR_TOKEN_KEY, token);
    }

    return token;
}

async function request(path, options = {}) {
    if (!API_URL) {
        throw new Error("VITE_API_URL is not configured.");
    }

    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    const visitorToken = getVisitorToken();

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "x-chat-visitor-token": visitorToken,
            ...(accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),
            ...options.headers,
        },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(
            result.error || "Chat request failed."
        );
        error.status = response.status;
        throw error;
    }

    return result;
}

export async function findExistingConversation() {
    const savedId = localStorage.getItem(CONVERSATION_KEY);

    // First, try the previously saved conversation.
    if (savedId) {
        try {
            await getChatMessages(savedId);
            return savedId;
        } catch (error) {
            if (error.status !== 404) throw error;

            localStorage.removeItem(CONVERSATION_KEY);
        }
    }

    // Look for an existing conversation using the visitor token
    // or the logged-in customer's account.
    const result = await request("/api/chat/conversations/current");

    const conversation = result.conversation;

    if (!conversation) return null;

    localStorage.setItem(CONVERSATION_KEY, conversation.id);

    return conversation.id;
}


export async function sendFirstChatMessage(message, { name, email } = {}) {
    const result = await request("/api/chat/conversations/first-message", {
        method: "POST",
        body: JSON.stringify({
            visitorToken: getVisitorToken(),
            message,
            name,
            email,
        }),
    });

    localStorage.setItem(CONVERSATION_KEY, result.conversation.id);

    return result;
}


export async function getOrCreateConversation({ name, email } = {}) {
    const visitorToken = getVisitorToken();
    let conversationId = localStorage.getItem(CONVERSATION_KEY);

    if (conversationId) {
        try {
            // Verify that this conversation is still accessible.
            await request(
                `/api/chat/conversations/${conversationId}/messages`
            );

            return conversationId;
        } catch (error) {
            if (error.status !== 404) throw error;

            localStorage.removeItem(CONVERSATION_KEY);
        }
    }

    const result = await request("/api/chat/conversations", {
        method: "POST",
        body: JSON.stringify({
            visitorToken,
            name,
            email,
        }),
    });

    conversationId = result.conversation.id;
    localStorage.setItem(CONVERSATION_KEY, conversationId);

    return conversationId;
}

export async function getChatMessages(conversationId) {
    const result = await request(
        `/api/chat/conversations/${conversationId}/messages`
    );

    return result.messages;
}

export async function sendChatMessage(conversationId, message) {
    const result = await request(
        `/api/chat/conversations/${conversationId}/messages`,
        {
            method: "POST",
            body: JSON.stringify({
                visitorToken: getVisitorToken(),
                message,
            }),
        }
    );

    return result.message;
}
