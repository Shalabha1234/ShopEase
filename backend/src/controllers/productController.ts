import {
  Request,
  Response,
} from "express";

import * as productService
  from "../services/productService";

// ==========================================
// GET ALL PRODUCTS
// ==========================================

export async function getProducts(
  req: Request,
  res: Response
) {
  try {
    const products =
      await productService.getAllProducts();

    res.json(products);

  } catch (error) {
    console.error(
      "Failed to fetch products:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch products",
    });
  }
}

// ==========================================
// GET PRODUCT BY ID
// ==========================================

export async function getProduct(
  req: Request,
  res: Response
) {
  try {
    const id =
      Number(req.params.id);

    const product =
      await productService.getProductById(
        id
      );

    res.json(product);

  } catch (error) {
    console.error(
      "Failed to fetch product:",
      error
    );

    res.status(500).json({
      message:
        "Product not found",
    });
  }
}

// ==========================================
// ADD NEW PRODUCT
// ADMIN
// ==========================================

export async function createProduct(
  req: Request,
  res: Response
) {
  try {
    const product =
      await productService.createProduct(
        req.body
      );

    res
      .status(201)
      .json(product);

  } catch (error: any) {
    console.error(
      "Failed to create product:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Failed to create product",
    });
  }
}

// ==========================================
// UPDATE PRODUCT
// ADMIN
// ==========================================

export async function updateProduct(
  req: Request,
  res: Response
) {
  try {
    const id =
      Number(req.params.id);

    const updatedProduct =
      await productService.updateProduct(
        id,
        req.body
      );

    res.json(
      updatedProduct
    );

  } catch (error: any) {
    console.error(
      "Failed to update product:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Failed to update product",
    });
  }
}
// ==========================================
// DELETE PRODUCT
// ADMIN
// ==========================================

export async function deleteProduct(
  req: Request,
  res: Response
) {
  try {
    const id =
      Number(req.params.id);

    const deletedProduct =
      await productService.deleteProduct(
        id
      );

    res.json(
      deletedProduct
    );

  } catch (error: any) {
    console.error(
      "Failed to delete product:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Failed to delete product",
    });
  }
}