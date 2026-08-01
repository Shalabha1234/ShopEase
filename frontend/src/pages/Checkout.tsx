import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { placeOrder } from "../api/OrderApi";
import { getUser, updateUser } from "../api/UserApi";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [loading, setLoading] = useState(true);

  const [isChangingAddress, setIsChangingAddress] =
    useState(false);

  const [savingAddress, setSavingAddress] =
    useState(false);

  const [hasSavedAddress, setHasSavedAddress] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");
    /*
   * Fetch saved user details
   */

  useEffect(() => {
    async function loadUserDetails() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUser(user.id);

        setFullName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setCity(data.city || "");
        setState(data.state || "");
        setPinCode(data.pin_code || "");

        const hasAddress =
          data.phone &&
          data.address &&
          data.city &&
          data.state &&
          data.pin_code;

        setHasSavedAddress(!!hasAddress);

        // New users immediately see the address form
        setIsChangingAddress(!hasAddress);

      } catch (error) {
        console.error(
          "Failed to load user details:",
                    error
        );
      } finally {
        setLoading(false);
      }
    }

    loadUserDetails();
  }, [user]);

  /*
   * Calculate subtotal
   */

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 99 : 0;

  const total = subtotal + shipping;

  /*
   * Save changed address
   */

  async function handleSaveAddress() {
    if (!user) {
      navigate("/login");
      return;
    }

    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pinCode
    ) {
      setErrorMessage(
        "Please fill all shipping details."
      );
      return;
    }

        try {
      setSavingAddress(true);

      await updateUser(user.id, {
        name: fullName,
        phone,
        address,
        city,
        state,
        pin_code: pinCode,
      });

      setHasSavedAddress(true);
      setErrorMessage("");
      setIsChangingAddress(false);

    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Failed to save address."
      );

    } finally {
      setSavingAddress(false);
    }
  }

  /*
   * Place Order
   */

  async function handlePlaceOrder() {
    if (!user) {
      navigate("/login");
      return;
    }

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pinCode
    ) {
      

          setErrorMessage(
        "Please complete your shipping address before placing the order."
      );
      return;
    }

    if (cart.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    try {
      setErrorMessage("");

      await placeOrder({
        userId: user.id,
        fullName,
        email,
        phone,
        address,
        city,
        state,
        pinCode,
        paymentMethod,
        totalAmount: total,
      });

      clearCart();

      navigate("/order-success");

    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Failed to place order."
      );
    }
  }

  /*
   * Loading Screen
   */

  if (loading) {
    return (
            <section className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Loading checkout...
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-10 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* ========================= */}
        {/* SHIPPING DETAILS */}
        {/* ========================= */}

        <div className="bg-white shadow rounded-xl p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-semibold">
              Shipping Details
            </h2>

            {hasSavedAddress && !isChangingAddress && (
              <button
                onClick={() =>
                  setIsChangingAddress(true)
                }
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Change Address
              </button>
            )}
          </div>

                    {hasSavedAddress && !isChangingAddress ? (

            /* ========================= */
            /* SAVED ADDRESS VIEW */
            /* ========================= */

            <div className="border rounded-xl p-5 bg-gray-50">

              <p className="text-lg font-semibold">
                {fullName}
              </p>

              <p className="text-gray-600 mt-2">
                📧 {email}
              </p>

              <p className="text-gray-600">
                📞 {phone}
              </p>

              <div className="border-t my-4"></div>

              <p className="text-gray-700">
                {address}
              </p>

              <p className="text-gray-700">
                {city}, {state}
              </p>

              <p className="text-gray-700">
                PIN Code: {pinCode}
              </p>

              <div className="mt-5">
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  ✓ Saved Address
                </span>
              </div>

            </div>

          ) : (

            /* ========================= */
            /* ADDRESS FORM */
            /* ========================= */

            <div>
                            <input
                className="w-full border p-3 rounded mb-4"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />

              <input
                className="w-full border p-3 rounded mb-4 bg-gray-100"
                placeholder="Email"
                value={email}
                readOnly
              />

              <input
                className="w-full border p-3 rounded mb-4"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

              <textarea
                rows={4}
                className="w-full border p-3 rounded mb-4"
                placeholder="Shipping Address"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
              />

              <input
                className="w-full border p-3 rounded mb-4"
                placeholder="City"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />

              <input
                className="w-full border p-3 rounded mb-4"
                placeholder="State"
                value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }
              />

              <input
                className="w-full border p-3 rounded mb-4"
                placeholder="PIN Code"
                value={pinCode}
                onChange={(e) =>
                  setPinCode(e.target.value)
                }
              />

                            {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="flex gap-3">

                <button
                  onClick={handleSaveAddress}
                  disabled={savingAddress}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl transition"
                >
                  {savingAddress
                    ? "Saving..."
                    : hasSavedAddress
                    ? "Update Address"
                    : "Save Address"}
                </button>

                {hasSavedAddress && (
                  <button
                    onClick={() =>
                      setIsChangingAddress(false)
                    }
                    className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl transition"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </div>

          )}

          {/* PAYMENT METHOD */}

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-4">
              Payment Method
            </h3>

            <select
              className="w-full border p-3 rounded"
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
            </select>

          </div>

        </div>

                {/* ========================= */}
        {/* ORDER SUMMARY */}
        {/* ========================= */}

        <div className="bg-white shadow rounded-xl p-6 h-fit">

          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          {cart.map((item) => (

            <div
              key={item.cartId}
              className="flex justify-between mb-3"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>

          ))}

          <hr className="my-5" />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {errorMessage && (
            <div className="mt-6 mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700">
              {errorMessage}
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
          >
            Place Order
          </button>

        </div>
      </div>
    </section>
  );
}

export default Checkout;