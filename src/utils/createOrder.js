import { supabase } from "../lib/supabase";

export async function createOrder(cartItems, address, phone) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not logged in" };
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Create order with status = pending
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user.id,
        total_amount: totalAmount,
        address,
        phone,
        status: "pending", // ✅ IMPORTANT
      },
    ])
    .select()
    .single();

  if (orderError) {
    console.error(orderError);
    return { success: false };
  }

  const items = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items);

  if (itemsError) {
    console.error(itemsError);
    return { success: false };
  }

  return { success: true, orderId: order.id };
}