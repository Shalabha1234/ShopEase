import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getOrders,
} from "../api/OrderHistoryApi";

type Order = {
  id: number;

  status: string;

  total_amount: number;

  created_at: string;

  order_items: {
    quantity: number;

    price: number;

    products: {
      name: string;

      image: string;
    };
  }[];
};

function Orders() {
  const {
    user,
  } = useAuth();

  const navigate =
    useNavigate();

  const [
    orders,
    setOrders,
  ] = useState<Order[]>(
    []
  );

  // Load orders
  useEffect(() => {
    async function loadOrders() {
      if (!user) {
        return;
      }

      try {
        const data =
          await getOrders(
            user.id
          );

        setOrders(data);
      } catch (error) {
        console.error(
          "Failed to load orders:",
          error
        );
      }
    }

    loadOrders();
  }, [user]);

  // Get status color
  function getStatusColor(
    status: string
  ) {
    switch (
      status.toLowerCase()
    ) {
      case "pending":
        return "text-yellow-600";

      case "confirmed":
        return "text-blue-600";

      case "packed":
        return "text-purple-600";

      case "shipped":
        return "text-indigo-600";

      case "out for delivery":
        return "text-orange-600";

      case "delivered":
        return "text-green-600";

      default:
        return "text-gray-600";
    }
  }

  return (
    <section className="min-h-screen bg-slate-50 px-16 py-10">

      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-3xl font-bold">
            📦 No Orders Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Looks like you haven't placed
            any orders.
          </p>

          <button
            onClick={() =>
              navigate("/products")
            }
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="space-y-8">

          {orders.map(
            (order) => (

              <div
                key={order.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                {/* Order Header */}

                <div className="flex justify-between mb-6">

                  <div>

                    <h2 className="text-xl font-bold">
                      Order #{order.id}
                    </h2>

                    <p className="text-gray-500">
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">
                      Status:
                    </p>

                    <span
                      className={`font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                {/* Order Items */}

                {order.order_items.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="flex items-center gap-5 border-t py-4"
                    >

                      <img
                        src={`/images/products/${item.products.image}`}
                        alt={
                          item.products.name
                        }
                        className="w-20 h-20 object-contain"
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {
                            item.products
                              .name
                          }
                        </h3>

                        <p>
                          Qty:{" "}
                          {
                            item.quantity
                          }{" "}
                          × ₹
                          {
                            item.price
                          }
                        </p>

                      </div>

                      <div className="font-bold text-blue-600">
                        ₹
                        {
                          item.price *
                          item.quantity
                        }
                      </div>

                    </div>

                  )
                )}

                {/* Order Total */}

                <div className="border-t mt-4 pt-4 flex justify-between text-xl font-bold">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {
                      order.total_amount
                    }
                  </span>

                </div>

                {/* Track Order Button */}

                <div className="flex justify-end mt-5">

                  <button
                    onClick={() =>
                      navigate(
                        `/orders/${order.id}`
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Track Order
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </section>
  );
}

export default Orders;