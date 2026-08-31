import { supabase } from "../lib/supabase";

// Review rows keep historical reviewer details, but profiles are the source of
// truth so a customer's current name and avatar appear on every past review.
export const attachCurrentReviewerProfiles = async (reviews) => {
    const userIds = [...new Set(
        (reviews || []).map((review) => review.user_id).filter(Boolean)
    )];

    if (!userIds.length) return reviews || [];

    const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", userIds);

    if (profilesError) {
        console.error("Failed to load current reviewer profiles:", profilesError);
        return reviews;
    }

    const profilesByUserId = new Map(
        (profiles || []).map((profile) => [profile.id, profile])
    );

    return reviews.map((review) => {
        const profile = profilesByUserId.get(review.user_id);

        return {
            ...review,
            current_reviewer_name: profile?.full_name || null,
            current_avatar: profile?.avatar_url || null,
        };
    });
};

export const createReview = async (review) => {
    const { data, error } = await supabase
        .from("product_reviews")
        .insert(review)
        .select()
        .single();

    if (error) throw error;

    return data;
};

export const getReviewByOrderItem = async (orderItemId) => {
    const { data, error } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("order_item_id", orderItemId)
        .maybeSingle();

    if (error) throw error;

    return data;
};

export const getMyProfile = async (userId) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", userId)
        .single();

    if (error) throw error;

    return data;
};

export const updateReview = async (id, review) => {
    const { data, error } = await supabase
        .from("product_reviews")
        .update(review)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
};

/* -------------------------------------------------------------------------- */
/*                                ADMIN REVIEWS                               */
/* -------------------------------------------------------------------------- */

export const getReviews = async () => {
    const { data, error } = await supabase
        .from("product_reviews")
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

    return attachCurrentReviewerProfiles(data);
};

export const approveReview = async (review) => {
    // console.log(review);
    const { error } = await supabase
        .from("product_reviews")
        .update({
            status: "approved",
            approved_at: new Date().toISOString(),
            admin_note: review.admin_note ?? ""
        })
        .select()
        .single()
        .eq("id", review.id);

    if (error) throw error;
};

export const rejectReview = async (reviewId) => {
    const { error } = await supabase
        .from("product_reviews")
        .update({
            status: "rejected",
        })
        .eq("id", reviewId);

    if (error) throw error;
};

export const getProductReviews = async (productId) => {
    const { data, error } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("product_id", productId)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

    if (error) throw error;

    return attachCurrentReviewerProfiles(data);
};

export const markReviewHelpful = async (reviewId) => {

    const { data, error } = await supabase.rpc(
        "mark_review_helpful",
        {
            review_id: reviewId,
        }
    );

    if (error) throw error;
};
