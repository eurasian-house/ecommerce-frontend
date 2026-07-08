import { supabase } from "../lib/supabase";

export const getOrderById = async (id) => {
    // 1. get order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

    if (orderError) throw orderError;

    // 2. get profile manually
    const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone, email, address, city, pincode, state, country")
        .eq("id", order.user_id)
        .single();

    // 3. get items
    const { data: items } = await supabase
        .from("order_items")
        .select(`
        *,
        products (
            id,
            slug,
            title,
            thumbnail
        )
    `)
        .eq("order_id", id);

    return {
        ...order,
        profiles: profile,
        order_items: items || []
    };
};

export const getOrderItemById = async (orderItemId) => {
    const { data, error } = await supabase
        .from("order_items")
        .select(`
            *,
            orders (
                id,
                user_id,
                status
            ),
            products (
                id,
                title,
                slug,
                thumbnail
            )
        `)
        .eq("id", orderItemId)
        .single();

    if (error) throw error;

    return data;
};

export const updateOrderStatus = async (id, status) => {
    const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id);

    if (error) throw error;
};