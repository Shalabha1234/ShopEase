import { useNavigate } from "react-router-dom";
import ShoppingImage from "../../assets/images/illustrations/shopping.svg";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[85vh] bg-gradient-to-r from-sky-50 via-white to-blue-50 flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-12">

      {/* LEFT */}

      <div className="max-w-xl text-center lg:text-left">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
          Find Something <br />
          You'll Love Today.
        </h1>

        <p className="text-gray-600 text-base sm:text-lg mt-6 leading-8">
          Discover quality products at affordable prices.
          From electronics to fashion, everything you need is just a click away.
        </p>

        {/* Start Shopping Button */}

        <div className="mt-10 flex justify-center lg:justify-start">

          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300"
          >
              🛍️Shop Now →
          </button>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex justify-center items-center mb-10 lg:mb-0">

        <img
          src={ShoppingImage}
          alt="Shopping"
          className="w-72 sm:w-96 lg:w-[600px]"
        />

      </div>

    </section>
  );
}

export default Hero;