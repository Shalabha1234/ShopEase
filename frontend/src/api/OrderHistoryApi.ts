const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// GET USER ORDER HISTORY
// ==========================================

export async function getOrders(userId: number) {
  const response = await fetch(
    `${API_URL}/api/my-orders/${userId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data;
}