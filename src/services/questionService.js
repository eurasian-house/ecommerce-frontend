import { supabase } from "../lib/supabase";

export async function getProductQuestions(productId) {
    const { data, error } = await supabase
        .from("product_questions")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    const userIds = [...new Set(
        (data || []).map((question) => question.user_id).filter(Boolean)
    )];

    if (!userIds.length) return data;

    const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, avatar_url")
        .in("id", userIds);

    if (profilesError) {
        console.error("Failed to load current question avatars:", profilesError);
        return data;
    }

    const avatarsByUserId = new Map(
        (profiles || []).map((profile) => [profile.id, profile.avatar_url])
    );

    return data.map((question) => ({
        ...question,
        current_avatar: avatarsByUserId.get(question.user_id),
    }));
}

export async function createQuestion(payload) {
    const { error } = await supabase
        .from("product_questions")
        .insert(payload);

    if (error) throw error;
}

export async function answerQuestion(id, answer) {
    const { data, error } = await supabase
        .from("product_questions")
        .update({
            answer,
            is_answered: true,
            answered_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

    console.log("Updated:", data);
    console.log("Error:", error);

    if (error) throw error;

    return data;
}

export async function getAllQuestions() {
    const { data, error } = await supabase
        .from("product_questions")
        .select(`
    *,
    products (
        id,
        title,
        thumbnail
    )
`)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
}
