const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// ORDER DATA TYPE
// ==========================================

export type OrderData = {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: string;
  totalAmount: number;
};

// ==========================================
// PLACE ORDER
// ==========================================

export async function placeOrder(order: OrderData) {
  const response = await fetch(
    `${API_URL}/api/orders`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(order),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to place order"
    );
  }

  return data;
}