import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-10 py-12 grid md:grid-cols-4 gap-10">

        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            🛒 ShopEase
          </h2>

          <p className="mt-4 text-gray-400">
            Your one-stop destination for quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-white">
                Products
              </Link>
            </li>

            <li>
              <Link to="/wishlist" className="hover:text-white">
                Wishlist
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            Email: support@shopease.com
          </p>

          <p className="text-gray-400 mt-2">
            Phone: +91 98765 43210
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">

            <span className="cursor-pointer hover:text-blue-400">
              📘
            </span>

            <span className="cursor-pointer hover:text-pink-400">
              📸
            </span>

            <span className="cursor-pointer hover:text-sky-400">
              🐦
            </span>

            <span className="cursor-pointer hover:text-red-500">
              ▶
            </span>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-gray-400">
        © 2026 ShopEase. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;