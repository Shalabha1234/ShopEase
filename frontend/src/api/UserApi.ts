const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// GET USER
// ==========================================

export async function getUser(id: number) {
  const response = await fetch(
    `${API_URL}/api/users/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

// ==========================================
// UPDATE USER
// ==========================================

export async function updateUser(
  id: number,
  userData: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pin_code: string;
  }
) {
  const response = await fetch(
    `${API_URL}/api/users/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}