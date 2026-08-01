const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// ADD TO CART
// ==========================================

export async function addToCart(
  userId: number,
  productId: number,
  quantity: number = 1
) {
  const response = await fetch(
    `${API_URL}/api/cart`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

// ==========================================
// GET CART
// ==========================================

export async function getCart(userId: number) {
  const response = await fetch(
    `${API_URL}/api/cart/${userId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

// ==========================================
// REMOVE FROM CART
// ==========================================

export async function removeFromCart(cartId: number) {
  const response = await fetch(
    `${API_URL}/api/cart/${cartId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

// ==========================================
// UPDATE CART QUANTITY
// ==========================================

export async function updateQuantity(
  cartId: number,
  quantity: number
) {
  const response = await fetch(
    `${API_URL}/api/cart/${cartId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}