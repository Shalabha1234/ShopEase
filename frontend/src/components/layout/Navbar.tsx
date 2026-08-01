import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Top Bar */}

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <Link
            to="/"
            onClick={closeMenu}
          >
            <h1 className="text-3xl font-extrabold text-blue-600">
              🛒 ShopEase
            </h1>
          </Link>

          {/* Desktop Menu */}

          <ul className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">

            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="hover:text-blue-600"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/wishlist"
                className="hover:text-blue-600"
              >
                Wishlist
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="relative hover:text-blue-600"
              >
                🛒 Cart

                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/orders"
                className="hover:text-blue-600"
              >
                My Orders
              </Link>
            </li>

            {isLoggedIn ? (
  <>
    <li className="font-semibold text-blue-600">
      👋 {user?.name}
    </li>

    {user?.is_admin && (
      <li>
        <Link
          to="/admin"
          onClick={closeMenu}
          className="block bg-purple-600 text-white text-center py-2 rounded-lg"
        >
          Admin Dashboard
        </Link>
      </li>
    )}

    <li>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
      >
        Logout
      </button>
    </li>
  </>
) : (
              <li>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Login
                </Link>
              </li>
            )}

          </ul>

          {/* Mobile Hamburger */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="lg:hidden text-4xl text-gray-700"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (

          <div className="lg:hidden pb-6">

            <ul className="flex flex-col gap-5 text-gray-700 font-medium">

              <li>
                <Link
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  onClick={closeMenu}
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  onClick={closeMenu}
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  onClick={closeMenu}
                >
                  🛒 Cart ({totalItems})
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  onClick={closeMenu}
                >
                  My Orders
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="font-semibold text-blue-600">
                    👋 {user?.name}
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block bg-blue-600 text-white text-center py-2 rounded-lg"
                  >
                    Login
                  </Link>
                </li>
              )}

            </ul>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;