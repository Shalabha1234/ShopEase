const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// ADD TO WISHLIST
// ==========================================

export async function addToWishlist(
  userId: number,
  productId: number
) {
  const response = await fetch(
    `${API_URL}/api/wishlist`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId,
        productId,
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
// GET WISHLIST
// ==========================================

export async function getWishlist(
  userId: number
) {
  const response = await fetch(
    `${API_URL}/api/wishlist/${userId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

export async function removeFromWishlist(
  wishlistId: number
) {
  const response = await fetch(
    `${API_URL}/api/wishlist/${wishlistId}`,
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