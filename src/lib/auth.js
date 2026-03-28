

import { supabase } from "./supabase";

// SIGN UP
export async function signUp({ email, password, options }) {
    console.log("signUp called:", email);
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
    });

    // ❌ If error from Supabase
    if (error) {
        const msg = error.message?.toLowerCase() || "";

        if (
            msg.includes("already registered") ||
            msg.includes("user already exists")
        ) {
            throw new Error("Email already exists. Please login.");
        }

        if (msg.includes("rate limit")) {
            throw new Error("Too many attempts. Try again later.");
        }

        throw new Error(error.message);
    }

    // 🟡 If user exists but no new account created (Supabase weird case)
    if (data?.user && data?.session === null && !data?.user?.identities?.length) {
        throw new Error("Email already exists. Please login.");
    }

    // ✅ SUCCESS
    console.log("signUp response:", data);
    return data;
}

// LOGIN
export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error("Invalid email or password");
    }

    return data;
}

// LOGOUT
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}