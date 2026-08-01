import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

import Toast from "./ui/Toast";

type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  stock: number;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
};

function ProductCard({
  id,
  image,
  name,
  category,
  brand,
  description,
  stock,
  price,
  oldPrice,
  rating,
  reviews,
}: ProductCardProps) {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { addToCart } = useCart();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const [showToast, setShowToast] = useState(false);

  const discount = Math.round(
    ((oldPrice - price) / oldPrice) * 100
  );

  async function handleAddToCart() {
    if (!user) {
     setShowToast(true);
navigate("/login");
return;
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        id,
        name,
        image,
        price,
      });

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error(error);
     setShowToast(true);
    }
  }

  async function handleBuyNow() {
    if (!user) {
  navigate("/login");
  return;
}

    try {
      await addToCart({
        id,
        name,
        image,
        price,
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

    try {
      const existing = wishlist.find(
        (item) => item.productId === id
      );

      if (existing) {
        await removeFromWishlist(existing.wishlistId);
      } else {
        await addToWishlist({
          id,
          name,
          image,
          price,
        });
      }
    } catch (error) {
  console.error(error);
}
  }

  return (
    <>
      <div className="min-w-[280px] bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 relative">

        {/* Discount Badge */}
        <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {discount}% OFF
        </span>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 text-2xl transition-all duration-300 hover:scale-125 ${
            isWishlisted(id)
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          ♥
        </button>

        {/* Product Image */}
        <Link to={`/product/${id}`}>
          <div className="flex justify-center mt-6">
            <img
              src={image}
              alt={name}
              className="h-44 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="text-xl font-bold text-gray-800 mt-6 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-sm text-gray-500 mt-1">
          {category}
        </p>

        {/* Brand */}
        <p className="text-sm text-gray-500">
          {brand}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {description}
        </p>

        {/* Stock */}
        <p className="text-sm mt-2">
          Stock:{" "}
          <span
            className={
              stock > 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {stock > 0 ? stock : "Out of Stock"}
          </span>
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-blue-600">
            ₹{price}
          </span>

          <span className="text-gray-400 line-through">
            ₹{oldPrice}
          </span>
        </div>

        {/* Rating */}
        <p className="text-yellow-500 font-medium mt-3">
          ⭐ {rating} ({reviews} Reviews)
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition duration-300"
          >
            Buy Now
          </button>

        </div>

      </div>

      {showToast && (
        <Toast message={`${name} added to cart!`} />
      )}
    </>
  );
}

export default ProductCard;