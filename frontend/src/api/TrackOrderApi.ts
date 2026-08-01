const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// GET ORDER BY ID
// ==========================================

export async function getOrderById(id: number) {
  const response = await fetch(
    `${API_URL}/api/orders/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch order"
    );
  }

  return data;
}