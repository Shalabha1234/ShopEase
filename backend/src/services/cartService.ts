import supabase from "../config/supabase";

export async function addToCart(
  userId: number,
  productId: number,
  quantity: number = 1
) {
  // Check if the product is already in the user's cart
  const { data: existingItem } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    const { data, error } = await supabase
      .from("cart")
      .update({
        quantity: existingItem.quantity + quantity,
      })
      .eq("id", existingItem.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  const { data, error } = await supabase
    .from("cart")
    .insert([
      {
        user_id: userId,
        product_id: productId,
        quantity,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getCart(userId: number) {
  const { data, error } = await supabase
    .from("cart")
    .select(`
      id,
      quantity,
      products (*)
    `)
    .eq("user_id", userId);

  if (error) throw error;

  return data;
}

export async function removeFromCart(cartId: number) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("id", cartId);

  if (error) throw error;

  return {
    message: "Item removed from cart",
  };
}
export async function updateQuantity(
  cartId: number,
  quantity: number
) {
  if (quantity <= 0) {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", cartId);

    if (error) throw error;

    return;
  }

  const { data, error } = await supabase
    .from("cart")
    .update({
      quantity,
    })
    .eq("id", cartId)
    .select()
    .single();

  if (error) throw error;

  return data;
}