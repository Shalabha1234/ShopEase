import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">

        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-4xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mt-4">
          Thank you for shopping with <strong>ShopEase</strong>.
        </p>

        <p className="text-gray-500 mt-2">
          Your order has been received and is being processed.
        </p>

        <div className="bg-gray-100 rounded-xl p-4 mt-8">
          <p className="text-lg font-semibold">
            Estimated Delivery
          </p>

          <p className="text-blue-600 font-bold mt-2">
            Within 3 - 5 Business Days
          </p>
        </div>

        <div className="flex gap-4 mt-8">

          <Link
            to="/products"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center"
          >
            Continue Shopping
          </Link>

          <Link
  to="/orders"
  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center"
>
  My Orders
</Link>
        </div>

      </div>
    </section>
  );
}

export default OrderSuccess;