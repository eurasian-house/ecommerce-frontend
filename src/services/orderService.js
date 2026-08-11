import { supabase } from "../lib/supabase";

export const getOrderById = async (id) => {
    // 1. Get order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

    if (orderError) throw orderError;

    // 2. Get order items
    const { data: items, error: itemsError } = await supabase
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

    if (itemsError) throw itemsError;

    return {
        ...order,
        order_items: items || [],
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