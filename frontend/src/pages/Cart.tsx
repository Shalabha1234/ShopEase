import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-slate-50 px-16 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        🛒 Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Looks like you haven't added anything yet.
          </p>

          <Link to="/products">
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.cartId}
                className="bg-white rounded-xl shadow-md p-5 flex items-center gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-blue-600 text-2xl font-bold mt-2">
                    ₹{item.price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.cartId)
                    }
                    className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.cartId)
                    }
                    className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.cartId)
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;