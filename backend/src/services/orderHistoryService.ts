import supabase from "../config/supabase";

export async function getOrders(userId: number) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        quantity,
        price,
        products(
          name,
          image
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}