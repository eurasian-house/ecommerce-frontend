import { supabase } from "../lib/supabase";

export async function createOrder(cartItems, customerData) {
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

  // Create Order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user.id,
        total_amount: totalAmount,
        address: customerData.address,
        phone: customerData.phone,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (orderError) {
    console.error("Order Error:", orderError);
    return { success: false, error: orderError.message };
  }


  const items = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
    production_days: item.production_days,

    // Future scalable IDs
    size_id: item.selectedSize?.id || null,
    color_id: item.selectedColor?.id || null,

    // Snapshot text values
    size:
      item.selectedSize?.size ||
      item.selectedSize ||
      item.size ||
      null,

    color:
      item.selectedColor?.color_name ||
      item.selectedColor?.color ||
      item.color?.color_name ||
      item.color ||
      null,

    color_image:
      item.selectedColor?.color_image ||
      item.color?.color_image ||
      null,

    // Customer data snapshot
    customer_name: customerData.name,
    phone: customerData.phone,
    email: customerData.email,
    pincode: customerData.pincode,
    address: customerData.address,
    city: customerData.city,
    state: customerData.state,
    country: customerData.country,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items);

  if (itemsError) {
    console.error("Items Insert Error:", itemsError);
    return { success: false, error: itemsError.message };
  }

  return {
    success: true,
    orderId: order.id,
  };
}