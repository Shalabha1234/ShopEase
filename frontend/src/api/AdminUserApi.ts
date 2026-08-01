const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// GET ALL USERS (ADMIN)
// ==========================================

export async function getAllUsers() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/users`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch users."
    );
  }

  return response.json();
}