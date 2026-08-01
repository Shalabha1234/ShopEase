import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProduct } from "../api/ProductApi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

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
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

const { addToCart } = useCart();

const {
  wishlist,
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="p-10 text-center text-2xl">
        Loading...
      </div>
    );
  }
  async function handleAddToCart() {
  if (!user) {
  navigate("/login");
  return;
}

  await addToCart({
    id: product!.id,
    name: product!.name,
    image: `/images/products/${product!.image}`,
    price: product!.price,
  });

  
}
async function handleBuyNow() {
  if (!user) {
  navigate("/login");
  return;
}

  try {
    

    await addToCart({
      id: product!.id,
      name: product!.name,
      image: `/images/products/${product!.image}`,
      price: product!.price,
    });

    navigate("/cart");
  } catch (error) {
  console.error(error);
}
}

async function handleWishlist() {
 if (!user) {
  navigate("/login");
  return;
}

  const existing = wishlist.find(
    (item) => item.productId === product!.id
  );

  if (existing) {
    await removeFromWishlist(existing.wishlistId);
  } else {
    await addToWishlist({
      id: product!.id,
      name: product!.name,
      image: `/images/products/${product!.image}`,
      price: product!.price,
    });
  }
}

  return (
    <section className="px-16 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-12">

        <div className="bg-gray-100 rounded-2xl p-10 flex justify-center">
          <img
            src={`/images/products/${product.image}`}
            alt={product.name}
            className="h-96 object-contain"
          />
        </div>

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {product.brand}
          </p>

          <p className="text-yellow-500 mt-4">
            ⭐ {product.rating} ({product.reviews} Reviews)
          </p>

          <div className="flex gap-4 items-center mt-6">

            <span className="text-4xl font-bold text-blue-600">
              ₹{product.price}
            </span>

            <span className="text-gray-400 line-through">
              ₹{product.old_price}
            </span>

          </div>

          <p className="mt-6 text-gray-700 leading-7">
            {product.description}
          </p>

          <p className="mt-6">
            <strong>Category:</strong> Category {product.category_id}
          </p>

          <p className="mt-2">
            <strong>Stock:</strong> {product.stock}
          </p>

          <div className="flex gap-4 mt-10">

  <button
    onClick={handleAddToCart}
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
  >
    Add to Cart
  </button>

  <button
    onClick={handleBuyNow}
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
  >
    Buy Now
  </button>

  <button
    onClick={handleWishlist}
    className={`px-8 py-3 rounded-xl text-white transition ${
      isWishlisted(product.id)
        ? "bg-red-500 hover:bg-red-600"
        : "bg-orange-500 hover:bg-orange-600"
    }`}
  >
    {isWishlisted(product.id)
      ? "Remove Wishlist"
      : "Add Wishlist"}
  </button>

</div> 

        </div>

      </div>
    </section>
  );
}

export default ProductDetails;