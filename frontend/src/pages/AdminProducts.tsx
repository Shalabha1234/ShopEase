import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/AdminProductApi";

type Product = {
  id: number;
  name: string;
  description: string;
  brand: string;
  category_id: number;
  price: number;
  old_price: number;
  stock: number;
  image: string;
  rating: number;
  reviews: number;
  created_at: string;
};

type ProductForm = {
  name: string;
  description: string;
  brand: string;
  category_id: string;
  price: string;
  old_price: string;
  stock: string;
  image: string;
};

function AdminProducts() {
  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] =
    useState<Product[]>([]);

    const [searchTerm, setSearchTerm] =
  useState("");

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // FORM VISIBILITY
  // ==========================================

  const [showForm, setShowForm] =
    useState(false);

  // ==========================================
  // EDITING PRODUCT ID
  // null = ADD MODE
  // number = EDIT MODE
  // ==========================================

  const [editingProductId, setEditingProductId] =
    useState<number | null>(null);

  // ==========================================
  // ADD / UPDATE LOADING
  // ==========================================

  const [savingProduct, setSavingProduct] =
    useState(false);

    // ==========================================
// DELETE PRODUCT LOADING
// ==========================================

const [deletingProductId, setDeletingProductId] =
  useState<number | null>(null);


  // ==========================================
  // SUCCESS MESSAGE
  // ==========================================

  const [successMessage, setSuccessMessage] =
    useState("");

  // ==========================================
  // ERROR MESSAGE
  // ==========================================

  const [errorMessage, setErrorMessage] =
    useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] =
  useState(false);

const [productToDelete, setProductToDelete] =
  useState<number | null>(null);

  // ==========================================
  // PRODUCT FORM
  // ==========================================

  const [form, setForm] =
    useState<ProductForm>({
      name: "",
      description: "",
      brand: "",
      category_id: "",
      price: "",
      old_price: "",
      stock: "",
      image: "",
    });

  // ==========================================
  // LOAD ALL PRODUCTS
  // ==========================================

  async function loadProducts() {
    try {
      setLoading(true);

      const data =
        await getAllProducts();

      setProducts(data);

    } catch (error) {
      console.error(
        "Failed to load products:",
        error
      );

      setErrorMessage(
        "Failed to load products."
      );

    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOAD PRODUCTS WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    loadProducts();
  }, []);

  // ==========================================
  // HANDLE FORM INPUT
  // ==========================================

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const {
      name,
      value,
    } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  // ==========================================
  // RESET FORM
  // ==========================================

  function resetForm() {
    setForm({
      name: "",
      description: "",
      brand: "",
      category_id: "",
      price: "",
      old_price: "",
      stock: "",
      image: "",
    });

    setEditingProductId(null);
  }

  // ==========================================
  // START EDITING PRODUCT
  // ==========================================

  function handleEditProduct(
    product: Product
  ) {
    setForm({
      name: product.name,
      description:
        product.description,
      brand: product.brand,

      category_id:
        String(product.category_id),

      price:
        String(product.price),

      old_price:
        String(product.old_price),

      stock:
        String(product.stock),

      image: product.image,
    });

    setEditingProductId(
      product.id
    );

    setShowForm(true);

    setSuccessMessage("");
    setErrorMessage("");

    // Scroll to form

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================
  // CANCEL EDITING
  // ==========================================

  function handleCancelEdit() {
    resetForm();

    setShowForm(false);

    setSuccessMessage("");
    setErrorMessage("");
  }

  // ==========================================
  // ADD OR UPDATE PRODUCT
  // ==========================================

  async function handleSubmitProduct(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !form.name ||
      !form.description ||
      !form.brand ||
      !form.category_id ||
      !form.price ||
      !form.old_price ||
      !form.stock ||
      !form.image
    ) {
      setErrorMessage(
        "Please fill in all product fields."
      );

      return;
    }

    try {
      setSavingProduct(true);

      // ==========================================
      // UPDATE EXISTING PRODUCT
      // ==========================================

      if (
        editingProductId !== null
      ) {
        await updateProduct(
          editingProductId,
          {
            name: form.name,

            description:
              form.description,

            brand: form.brand,

            category_id:
              Number(
                form.category_id
              ),

            price:
              Number(
                form.price
              ),

            old_price:
              Number(
                form.old_price
              ),

            stock:
              Number(
                form.stock
              ),

            image:
              form.image,
          }
        );

        setSuccessMessage(
          "Product updated successfully!"
        );

      }

      // ==========================================
      // CREATE NEW PRODUCT
      // ==========================================

      else {
        await createProduct({
          name: form.name,

          description:
            form.description,

          brand: form.brand,

          category_id:
            Number(
              form.category_id
            ),

          price:
            Number(
              form.price
            ),

          old_price:
            Number(
              form.old_price
            ),

          stock:
            Number(
              form.stock
            ),

          image:
            form.image,

          rating: 0,

          reviews: 0,
        });

        setSuccessMessage(
          "Product added successfully!"
        );
      }

      // ==========================================
      // RESET FORM
      // ==========================================

      resetForm();

      setShowForm(false);

      // ==========================================
      // RELOAD PRODUCTS
      // ==========================================

      await loadProducts();

    } catch (error: any) {
      console.error(
        "Failed to save product:",
        error
      );

      setErrorMessage(
        error.message ||
        "Failed to save product."
      );

    } finally {
      setSavingProduct(false);
    }
  }
  // ==========================================
// DELETE PRODUCT
// ==========================================

async function handleDeleteProduct() {
  if (productToDelete === null) return;

  setSuccessMessage("");
  setErrorMessage("");

  try {
    setDeletingProductId(productToDelete);

    await deleteProduct(productToDelete);

    setProducts((previousProducts) =>
      previousProducts.filter(
        (product) =>
          product.id !== productToDelete
      )
    );

    setSuccessMessage(
      "Product deleted successfully!"
    );

    setShowDeleteConfirm(false);
    setProductToDelete(null);

  } catch (error: any) {
    console.error(error);

    setErrorMessage(
      error.message ||
      "Failed to delete product."
    );

  } finally {
    setDeletingProductId(null);
  }
}
  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-xl font-semibold text-gray-600">
          Loading products...
        </div>

      </section>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="min-h-screen bg-slate-50 px-6 md:px-12 py-10">

      <div className="max-w-7xl mx-auto">

        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Manage Products
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage products in your ShopEase store.
            </p>

          </div>

          <div className="mt-4 md:mt-0 flex gap-3">

            {/* Add Product Button */}

            <button
              onClick={() => {

                if (
                  editingProductId !== null
                ) {
                  resetForm();
                }

                setShowForm(
                  !showForm
                );

                setSuccessMessage("");
                setErrorMessage("");

              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >

              {showForm
                ? "✕ Close Form"
                : "+ Add Product"}

            </button>

            {/* Back Button */}

            <Link
              to="/admin"
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              ← Back
            </Link>

          </div>

        </div>


        {/* ================================= */}
        {/* SUCCESS MESSAGE */}
        {/* ================================= */}

        {successMessage && (

          <div className="bg-green-100 border border-green-300 text-green-700 px-5 py-4 rounded-lg mb-6">

            {successMessage}

          </div>

        )}


        {/* ================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================= */}

        {errorMessage && (

          <div className="bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-lg mb-6">

            {errorMessage}

          </div>

        )}
        {showDeleteConfirm && (
  <div className="bg-red-50 border border-red-300 rounded-xl p-5 mb-6 shadow">

    <h3 className="text-lg font-bold text-red-700">
      Delete Product?
    </h3>

    <p className="text-gray-700 mt-2">
      Are you sure you want to delete this product?
      This action cannot be undone.
    </p>

    <div className="flex justify-end gap-3 mt-5">

      <button
        onClick={() => {
          setShowDeleteConfirm(false);
          setProductToDelete(null);
        }}
        className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg font-semibold"
      >
        Cancel
      </button>

      <button
        onClick={handleDeleteProduct}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold"
      >
        Delete
      </button>

    </div>

  </div>
)}


        {/* ================================= */}
        {/* ADD / EDIT PRODUCT FORM */}
        {/* ================================= */}

        {showForm && (

          <div className="bg-white rounded-xl shadow-lg p-6 mb-10">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

              {editingProductId !== null
                ? "Edit Product"
                : "Add New Product"}

            </h2>

            <form
              onSubmit={
                handleSubmitProduct
              }
              className="space-y-6"
            >

              {/* Product Name */}

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter product name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Description */}

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter product description"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Brand */}

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter brand"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Category + Price */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Category ID */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Category ID
                  </label>

                  <input
                    type="number"
                    name="category_id"
                    value={
                      form.category_id
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Example: 3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>


                {/* Price */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Enter price"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>


              {/* Old Price + Stock */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Old Price */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Old Price
                  </label>

                  <input
                    type="number"
                    name="old_price"
                    value={
                      form.old_price
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Enter old price"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>


                {/* Stock */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Enter stock quantity"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>


              {/* Image */}

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Image Filename
                </label>

                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: earbuds.jpg"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-sm text-gray-500 mt-2">
                  Enter the image filename from your products images folder.
                </p>

              </div>


              {/* Buttons */}

              <div className="flex justify-end gap-3">

                {/* Cancel Edit */}

                {editingProductId !== null && (

                  <button
                    type="button"
                    onClick={
                      handleCancelEdit
                    }
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Cancel Edit
                  </button>

                )}


                {/* Submit */}

                <button
                  type="submit"
                  disabled={
                    savingProduct
                  }
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
                >

                  {savingProduct

                    ? editingProductId !== null
                      ? "Updating Product..."
                      : "Adding Product..."

                    : editingProductId !== null
                      ? "Update Product"
                      : "Add Product"}

                </button>

              </div>

            </form>

          </div>

        )}
        {/* ================================= */}
{/* SEARCH */}
{/* ================================= */}

<div className="bg-white rounded-xl shadow-lg p-5 mb-8">

  <input
    type="text"
    placeholder="🔍 Search products..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>


        {/* ================================= */}
        {/* PRODUCT COUNT */}
        {/* ================================= */}

        <div className="bg-white rounded-xl shadow-lg p-5 mb-8">

          <p className="text-gray-500">
            Total Products
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-1">
           {
  products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ).length
}
          </p>

        </div>


        {/* ================================= */}
        {/* NO PRODUCTS */}
        {/* ================================= */}

        {products.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              There are currently no products in your store.
            </p>

          </div>

        ) : (

          /* ================================= */
          /* PRODUCT GRID */
          /* ================================= */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {products
  .filter((product) =>
    product.name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  )
  .map(
              (product) => (

                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                >

                  {/* Product Image */}

                  <div className="h-56 bg-gray-50 flex items-center justify-center p-5">

                    <img
                      src={`/images/products/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />

                  </div>


                  {/* Product Details */}

                  <div className="p-5">

                    {/* Product Name */}

                    <h2 className="text-xl font-bold text-gray-800">
                      {product.name}
                    </h2>


                    {/* Brand */}

                    <p className="text-sm text-gray-500 mt-1">
                      Brand:{" "}

                      <span className="font-medium">
                        {product.brand}
                      </span>

                    </p>


                    {/* Description */}

                    <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                      {product.description}
                    </p>


                    {/* Price */}

                    <div className="flex items-center gap-3 mt-4">

                      <span className="text-xl font-bold text-blue-600">
                        ₹
                        {product.price.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span className="text-sm text-gray-400 line-through">
                        ₹
                        {product.old_price.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>


                    {/* Stock */}

                    <div className="mt-4">

                      <span className="text-gray-500">
                        Stock:{" "}
                      </span>

                      <span
                        className={
                          product.stock > 0
                            ? "font-semibold text-green-600"
                            : "font-semibold text-red-600"
                        }
                      >
                        {product.stock > 0
                          ? `${product.stock} available`
                          : "Out of stock"}
                      </span>

                    </div>


                    {/* Rating */}

                    <div className="mt-3 text-sm">

                      <span className="text-yellow-500">
                        ⭐
                      </span>{" "}

                      <span className="font-semibold">
                        {product.rating}
                      </span>

                      <span className="text-gray-500">
                        {" "}
                        ({product.reviews} reviews)
                      </span>

                    </div>


                    {/* Product Actions */}

<div className="mt-5 pt-4 border-t flex gap-3">

  {/* Edit Button */}

  <button
    onClick={() =>
      handleEditProduct(
        product
      )
    }
    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
  >
    ✏️ Edit
  </button>


  {/* Delete Button */}

  <button
    onClick={() => {
  setProductToDelete(product.id);
  setShowDeleteConfirm(true);
}}
    disabled={
      deletingProductId ===
      product.id
    }
    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition"
  >
    {deletingProductId ===
    product.id
      ? "Deleting..."
      : "🗑️ Delete"}
  </button>

</div>

                    {/* Product ID */}

                    <div className="mt-4">

                      <p className="text-xs text-gray-400">
                        Product ID:{" "}
                        {product.id}
                      </p>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}

export default AdminProducts;