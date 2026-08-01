import supabase from "../config/supabase";

export async function addToWishlist(
  userId: number,
  productId: number
) {
  // Check if already exists
  const { data: existing } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("wishlist")
    .insert([
      {
        user_id: userId,
        product_id: productId,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getWishlist(userId: number) {
  const { data, error } = await supabase
    .from("wishlist")
    .select(`
      id,
      products (*)
    `)
    .eq("user_id", userId);

  if (error) throw error;

  return data;
}

export async function removeFromWishlist(
  wishlistId: number
) {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", wishlistId);

  if (error) throw error;

  return {
    message: "Removed from wishlist",
  };
}