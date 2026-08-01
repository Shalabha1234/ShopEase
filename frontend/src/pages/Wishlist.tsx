import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  return (
    <section className="px-16 py-10 min-h-screen bg-slate-50">

      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center mt-20">

          <h2 className="text-2xl font-semibold">
            Wishlist is empty
          </h2>

          <Link to="/products">

            <button className="mt-5 bg-blue-600 text-white px-5 py-3 rounded">

              Continue Shopping

            </button>

          </Link>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {wishlist.map((item) => (

            <div
              key={item.wishlistId}
              className="bg-white rounded-xl shadow-md p-5"
            >

              <img
                src={item.image}
                alt={item.name}
                className="h-48 mx-auto object-contain"
              />

              <h2 className="font-bold mt-4">
                {item.name}
              </h2>

              <p className="text-blue-600 text-xl font-bold mt-2">
                ₹{item.price}
              </p>

              <button
                onClick={() =>
                  removeFromWishlist(
                    item.wishlistId
                  )
                }
                className="w-full mt-5 bg-red-500 text-white py-3 rounded"
              >
                Remove
              </button>

            </div>

          ))}

        </div>
      )}
    </section>
  );
}

export default Wishlist;