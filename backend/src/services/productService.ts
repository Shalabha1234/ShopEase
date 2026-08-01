import supabase from "../config/supabase";

// ==========================================
// GET ALL PRODUCTS
// ==========================================

export async function getAllProducts() {
  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// GET PRODUCT BY ID
// ==========================================

export async function getProductById(
  id: number
) {
  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// CREATE NEW PRODUCT
// ADMIN
// ==========================================

export async function createProduct(
  product: any
) {
  const {
    data,
    error,
  } = await supabase
    .from("products")
    .insert([
      {
        name: product.name,
        description:
          product.description,
        brand: product.brand,
        category_id:
          product.category_id,
        price: product.price,
        old_price:
          product.old_price,
        stock: product.stock,
        image: product.image,
        rating:
          product.rating ?? 0,
        reviews:
          product.reviews ?? 0,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// UPDATE PRODUCT
// ADMIN
// ==========================================

export async function updateProduct(
  id: number,
  product: any
) {
  const {
    data,
    error,
  } = await supabase
    .from("products")
    .update({
      name: product.name,
      description: product.description,
      brand: product.brand,
      category_id: product.category_id,
      price: product.price,
      old_price: product.old_price,
      stock: product.stock,
      image: product.image,
    })
    .eq("id", id)
    .select("*");

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error(
      `Product with ID ${id} was not found or could not be updated.`
    );
  }

  return data[0];
}
// ==========================================
// DELETE PRODUCT
// ==========================================

export async function deleteProduct(
  id: number
) {
  const {
    data,
    error,
  } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select("*");

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error(
      `Product with ID ${id} was not found or could not be deleted.`
    );
  }

  return data[0];
}