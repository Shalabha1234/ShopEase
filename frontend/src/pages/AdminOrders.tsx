import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getAllOrders,
  updateOrderStatus,
} from "../api/AdminOrderApi";

type Order = {
  id: number;

  user_id: number;

  full_name: string;

  email: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  pin_code: string;

  payment_method: string;

  total_amount: number;

  status: string;

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

const statusOptions = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function AdminOrders() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
const [successMessage, setSuccessMessage] = useState("");
const navigate = useNavigate();

  // ========================================
  // LOAD ALL ORDERS
  // ========================================

  async function loadOrders() {
    try {
      setLoading(true);

      const data =
        await getAllOrders();

      setOrders(data);

    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );

      setErrorMessage("Failed to load orders.");
    

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  // ========================================
  // UPDATE STATUS
  // ========================================

  async function handleStatusChange(
    orderId: number,
    newStatus: string
  ) {
    try {
      setUpdatingId(orderId);

      await updateOrderStatus(
        orderId,
        newStatus
      );

      // Update the order
      // immediately on screen
      setOrders((previousOrders) =>
        previousOrders.map(
          (order) =>
            order.id === orderId
              ? {
                  ...order,
                  status:
                    newStatus,
                }
              : order
        )
      );
      setSuccessMessage("Order status updated successfully.");
setErrorMessage("");

    } catch (error) {
      console.error(
        "Failed to update status:",
        error
      );

      setErrorMessage("Failed to update order status.");
      

    } finally {
      setUpdatingId(null);
    }
  }

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-xl font-semibold text-gray-600">
          Loading orders...
        </div>

      </section>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <section className="min-h-screen bg-slate-50 px-6 md:px-12 py-10">

      <div className="max-w-7xl mx-auto">
        <button
  onClick={() => navigate("/admin")}
  className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
>
  ← Back to Dashboard
</button>

{successMessage && (
  <div className="mb-5 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
    {successMessage}
  </div>
)}

{errorMessage && (
  <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
    {errorMessage}
  </div>
)}

        {/* Page Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Manage Orders
            </h1>

            <p className="text-gray-500 mt-2">
              View and update customer orders
            </p>

          </div>

          <div className="mt-4 md:mt-0 bg-white px-5 py-3 rounded-lg shadow">

            <span className="text-gray-500">
              Total Orders:{" "}
            </span>

            <span className="font-bold text-blue-600">
              {orders.length}
            </span>

          </div>

        </div>

        {/* No Orders */}

        {orders.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              There are currently no customer orders.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                {/* Order Header */}

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 border-b pb-5">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">
                      Order #{order.id}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                  {/* Status */}

                  <div className="flex flex-col items-start md:items-end">

                    <label className="font-semibold text-gray-700 mb-2">
                      Order Status
                    </label>

                    <select
                      value={order.status}
                      disabled={
                        updatingId ===
                        order.id
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >

                      {statusOptions.map(
                        (status) => (

                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>

                        )
                      )}

                    </select>

                    {updatingId ===
                      order.id && (

                      <p className="text-sm text-blue-600 mt-2">
                        Updating...
                      </p>

                    )}

                  </div>

                </div>

                {/* Customer Details */}

                <div className="grid md:grid-cols-2 gap-6 py-6 border-b">

                  <div>

                    <h3 className="font-semibold text-lg mb-3">
                      Customer Details
                    </h3>

                    <p>
                      <span className="font-medium">
                        Name:
                      </span>{" "}
                      {order.full_name}
                    </p>

                    <p>
                      <span className="font-medium">
                        Email:
                      </span>{" "}
                      {order.email}
                    </p>

                    <p>
                      <span className="font-medium">
                        Phone:
                      </span>{" "}
                      {order.phone}
                    </p>

                  </div>

                  <div>

                    <h3 className="font-semibold text-lg mb-3">
                      Delivery Address
                    </h3>

                    <p>
                      {order.address}
                    </p>

                    <p>
                      {order.city},{" "}
                      {order.state}
                    </p>

                    <p>
                      PIN:{" "}
                      {order.pin_code}
                    </p>

                  </div>

                </div>

                {/* Products */}

                <div className="py-6">

                  <h3 className="font-semibold text-lg mb-4">
                    Ordered Products
                  </h3>

                  <div className="space-y-4">

                    {order.order_items.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="flex items-center gap-4 border-b pb-4"
                        >

                          <img
                            src={`/images/products/${item.products.image}`}
                            alt={
                              item.products.name
                            }
                            className="w-20 h-20 object-contain"
                          />

                          <div className="flex-1">

                            <h4 className="font-semibold">
                              {
                                item.products
                                  .name
                              }
                            </h4>

                            <p className="text-gray-500">
                              Quantity:{" "}
                              {
                                item.quantity
                              }
                            </p>

                            <p className="text-gray-500">
                              Price: ₹
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

                  </div>

                </div>

                {/* Order Footer */}

                <div className="border-t pt-5 flex flex-col md:flex-row md:justify-between gap-4">

                  <div>

                    <p className="text-gray-500">
                      Payment Method
                    </p>

                    <p className="font-semibold">
                      {
                        order.payment_method
                      }
                    </p>

                  </div>

                  <div className="text-left md:text-right">

                    <p className="text-gray-500">
                      Total Amount
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                      ₹
                      {
                        order.total_amount
                      }
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default AdminOrders;