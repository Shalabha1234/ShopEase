const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// GET ALL PRODUCTS
// ==========================================

export async function getProducts() {
  const response = await fetch(
    `${API_URL}/api/products`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return data;
}

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

export async function getProduct(id: number) {
  const response = await fetch(
    `${API_URL}/api/products/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return data;
}