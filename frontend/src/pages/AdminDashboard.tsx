import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getDashboardStats,
} from "../api/AdminDashboardApi";

// ==========================================
// DASHBOARD STATS TYPE
// ==========================================

type DashboardStats = {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
};

function AdminDashboard() {

  // ==========================================
  // DASHBOARD STATISTICS
  // ==========================================

  const [stats, setStats] =
    useState<DashboardStats>({
      totalProducts: 0,
      totalUsers: 0,
      totalOrders: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
      totalRevenue: 0,
    });

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // ERROR
  // ==========================================

  const [error, setError] =
    useState("");


  // ==========================================
  // LOAD DASHBOARD STATISTICS
  // ==========================================

  async function loadDashboardStats() {

    try {

      setLoading(true);

      setError("");

      const data =
        await getDashboardStats();

      setStats(data);

    } catch (error: any) {

      console.error(
        "Failed to load dashboard statistics:",
        error
      );

      setError(
        error.message ||
        "Failed to load dashboard statistics."
      );

    } finally {

      setLoading(false);

    }

  }


  // ==========================================
  // LOAD STATS WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {

    loadDashboardStats();

  }, []);


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <section className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-xl font-semibold text-gray-600">

          Loading dashboard...

        </div>

      </section>

    );

  }


  // ==========================================
  // ERROR SCREEN
  // ==========================================

  if (error) {

    return (

      <section className="min-h-screen bg-slate-50 px-6 md:px-12 py-10">

        <div className="max-w-7xl mx-auto">

          <div className="bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-lg">

            {error}

          </div>

          <button
            onClick={loadDashboardStats}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            Try Again
          </button>

        </div>

      </section>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <section className="min-h-screen bg-slate-50 px-6 md:px-12 py-10">

      <div className="max-w-7xl mx-auto">


        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your ShopEase store from here.
          </p>

        </div>


        {/* ================================= */}
        {/* DASHBOARD CARDS */}
        {/* ================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


          {/* ================================= */}
          {/* MANAGE ORDERS */}
          {/* ================================= */}

          <Link
            to="/admin/orders"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Orders
                </h2>

                <p className="text-gray-500 mt-2">
                  {stats.totalOrders} total orders
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {stats.pendingOrders} pending •{" "}
                  {stats.deliveredOrders} delivered
                </p>

              </div>

              <div className="text-4xl">
                📦
              </div>

            </div>

            <div className="mt-6">

              <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                View Orders
              </span>

            </div>

          </Link>


          {/* ================================= */}
          {/* MANAGE PRODUCTS */}
          {/* ================================= */}

          <Link
            to="/admin/products"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Products
                </h2>

                <p className="text-gray-500 mt-2">
                  {stats.totalProducts} products in your store
                </p>

              </div>

              <div className="text-4xl">
                🛍️
              </div>

            </div>

            <div className="mt-6">

              <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                Manage Products
              </span>

            </div>

          </Link>


          {/* ================================= */}
          {/* MANAGE USERS */}
          {/* ================================= */}

          <Link
            to="/admin/users"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Users
                </h2>

                <p className="text-gray-500 mt-2">
                  {stats.totalUsers} registered customers
                </p>

              </div>

              <div className="text-4xl">
                👥
              </div>

            </div>

            <div className="mt-6">

              <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                View Users
              </span>

            </div>

          </Link>

        </div>


        {/* ================================= */}
        {/* STORE STATISTICS */}
        {/* ================================= */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Store Statistics
          </h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


            {/* Total Orders */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <p className="text-gray-500">
                Total Orders
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.totalOrders}
              </p>

            </div>


            {/* Total Products */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <p className="text-gray-500">
                Total Products
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.totalProducts}
              </p>

            </div>


            {/* Total Users */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <p className="text-gray-500">
                Total Users
              </p>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {stats.totalUsers}
              </p>

            </div>


            {/* Total Revenue */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <p className="text-gray-500">
                Total Revenue
              </p>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                ₹
                {stats.totalRevenue.toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================= */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


            {/* View Orders */}

            <Link
              to="/admin/orders"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-4 rounded-lg font-semibold transition"
            >
              📦 View Orders
            </Link>


            {/* View Products */}

            <Link
              to="/admin/products"
              className="bg-green-600 hover:bg-green-700 text-white text-center px-6 py-4 rounded-lg font-semibold transition"
            >
              🛍️ View Products
            </Link>


            {/* View Users */}

            <Link
              to="/admin/users"
              className="bg-purple-600 hover:bg-purple-700 text-white text-center px-6 py-4 rounded-lg font-semibold transition"
            >
              👥 View Users
            </Link>


            {/* Back to Store */}

            <Link
              to="/"
              className="bg-gray-700 hover:bg-gray-800 text-white text-center px-6 py-4 rounded-lg font-semibold transition"
            >
              🏠 Back to Store
            </Link>

          </div>

        </div>


        {/* ================================= */}
        {/* ADMIN INFORMATION */}
        {/* ================================= */}

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Admin Panel
          </h2>

          <p className="text-gray-500 mt-2">
            Use the options above to manage your ShopEase
            ecommerce platform.
          </p>


          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">


            {/* Orders */}

            <div className="border rounded-lg p-4">

              <p className="text-gray-500">
                Orders
              </p>

              <p className="text-xl font-bold mt-1">
                {stats.totalOrders} Orders
              </p>

            </div>


            {/* Products */}

            <div className="border rounded-lg p-4">

              <p className="text-gray-500">
                Products
              </p>

              <p className="text-xl font-bold mt-1">
                {stats.totalProducts} Products
              </p>

            </div>


            {/* Customers */}

            <div className="border rounded-lg p-4">

              <p className="text-gray-500">
                Customers
              </p>

              <p className="text-xl font-bold mt-1">
                {stats.totalUsers} Users
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default AdminDashboard;