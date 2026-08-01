import supabase from "../config/supabase";
// ==========================================
// GET ALL USERS
// ==========================================

export async function getAllUsers() {

  const { data, error } =
    await supabase
      .from("users")
      .select(
        "id, name, email, created_at"
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  return data;
}
export async function getUserById(id: number) {
  const { data, error } = await supabase
    .from("users")
    .select(
      "id, name, email, phone, address, city, state, pin_code"
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateUser(
  id: number,
  user: {
    phone: string;
    address: string;
    city: string;
    state: string;
    pin_code: string;
  }
) {
  const { data, error } = await supabase
    .from("users")
    .update({
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      pin_code: user.pin_code,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}