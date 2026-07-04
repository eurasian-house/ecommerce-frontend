import { supabase } from "../lib/supabase";

export async function getProductQuestions(productId) {
    const { data, error } = await supabase
        .from("product_questions")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
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