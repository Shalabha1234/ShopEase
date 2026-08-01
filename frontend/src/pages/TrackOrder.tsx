import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getOrderById } from "../api/TrackOrderApi";

type Order = {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  payment_method: string;
  order_items: {
    quantity: number;
    price: number;
    products: {
      name: string;
      image: string;
    };
  }[];
};

function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        const data = await getOrderById(Number(id));
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  const steps = [
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = steps.findIndex(
    (step) =>
      step.toLowerCase() === order.status.toLowerCase()
  );

  return (
    <section className="min-h-screen bg-slate-50 px-16 py-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-8 border px-5 py-2 rounded-lg hover:bg-gray-100"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Track Order
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Left */}

        <div className="bg-white shadow rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Order Details
          </h2>

          <p>
            <strong>Order ID:</strong> #{order.id}
          </p>

          <p className="mt-3">
            <strong>Order Date:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>

          <p className="mt-3">
            <strong>Total:</strong> ₹{order.total_amount}
          </p>

          <p className="mt-3">
            <strong>Payment:</strong>{" "}
            {order.payment_method}
          </p>

          <hr className="my-6" />

          <h3 className="text-xl font-semibold mb-4">
            Shipping Address
          </h3>

          <p>{order.full_name}</p>

          <p>{order.phone}</p>

          <p>{order.address}</p>

          <p>
            {order.city}, {order.state}
          </p>

          <p>{order.pin_code}</p>

        </div>

        {/* Right */}

        <div className="bg-white shadow rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Delivery Status
          </h2>

          <div className="space-y-5">

            {steps.map((step, index) => (

              <div
                key={step}
                className="flex items-center gap-4"
              >

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white
                    ${
                      index <= currentStep
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                >
                  ✓
                </div>

                <div>

                  <p
                    className={`font-semibold
                      ${
                        index <= currentStep
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                  >
                    {step}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="bg-white shadow rounded-xl p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Ordered Products
        </h2>

        {order.order_items.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-6 border-b py-5"
          >

            <img
              src={`/images/products/${item.products.image}`}
              alt={item.products.name}
              className="w-24 h-24 object-contain"
            />

            <div className="flex-1">

              <h3 className="font-bold text-lg">
                {item.products.name}
              </h3>

              <p>
                Quantity: {item.quantity}
              </p>

            </div>

            <div className="text-xl font-bold text-blue-600">
              ₹{item.price}
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default TrackOrder;