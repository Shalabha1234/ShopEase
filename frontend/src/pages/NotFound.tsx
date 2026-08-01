
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>

      <p className="text-2xl mt-4">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>
    </section>
  );
}

export default NotFound;