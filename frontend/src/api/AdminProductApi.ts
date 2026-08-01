const API_URL = import.meta.env.VITE_API_URL;

// ==========================================
// GET ALL PRODUCTS FOR ADMIN
// ==========================================

export async function getAllProducts() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/products`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

// ==========================================
// CREATE NEW PRODUCT
// ADMIN
// ==========================================

export async function createProduct(
  product: {
    name: string;
    description: string;
    brand: string;
    category_id: number;
    price: number;
    old_price: number;
    stock: number;
    image: string;
    rating?: number;
    reviews?: number;
  }
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/products`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message ||
      "Failed to create product"
    );
  }

  return response.json();
}

// ==========================================
// UPDATE PRODUCT
// ADMIN
// ==========================================

export async function updateProduct(
  id: number,
  product: {
    name: string;
    description: string;
    brand: string;
    category_id: number;
    price: number;
    old_price: number;
    stock: number;
    image: string;
  }
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/products/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message ||
      "Failed to update product"
    );
  }

  return response.json();
}

// ==========================================
// DELETE PRODUCT
// ==========================================

export async function deleteProduct(
  id: number
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/products/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message ||
      "Failed to delete product"
    );
  }

  return response.json();
}