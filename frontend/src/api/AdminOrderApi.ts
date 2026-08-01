const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// GET ALL ORDERS
// ADMIN ONLY
// ==========================================

export async function getAllOrders() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/orders/admin/all`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data;
}

// ==========================================
// UPDATE ORDER STATUS
// ADMIN ONLY
// ==========================================

export async function updateOrderStatus(
  orderId: number,
  status: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/orders/admin/${orderId}/status`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update order status"
    );
  }

  return data;
}

// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================

export async function getDashboardStats() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/orders/admin/stats`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch dashboard statistics"
    );
  }

  return response.json();
}