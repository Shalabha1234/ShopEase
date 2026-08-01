import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getAllUsers,
} from "../api/AdminUserApi";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

function AdminUsers() {

  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD USERS
  // ==========================================

  async function loadUsers() {

    try {

      setLoading(true);

      const data =
        await getAllUsers();

      setUsers(data);

    } catch (error: any) {

      console.error(error);

      setError(
        error.message ||
        "Failed to load users."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadUsers();

  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <section className="min-h-screen flex items-center justify-center">

        <h2 className="text-xl font-semibold">
          Loading users...
        </h2>

      </section>

    );

  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <section className="min-h-screen flex items-center justify-center">

        <h2 className="text-red-600 text-xl">
          {error}
        </h2>

      </section>

    );

  }

  return (

    <section className="min-h-screen bg-slate-50 px-6 md:px-12 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Manage Users
            </h1>

            <p className="text-gray-500 mt-2">
              Registered customers
            </p>

          </div>

          <Link
            to="/admin"
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold"
          >
            ← Back
          </Link>

        </div>


        {/* Total Users */}

        <div className="bg-white shadow-lg rounded-xl p-5 mb-8">

          <p className="text-gray-500">
            Total Users
          </p>

          <p className="text-3xl font-bold text-purple-600">
            {users.length}
          </p>

        </div>


        {/* User Cards */}

        <div className="grid md:grid-cols-2 gap-6">

          {users.map((user) => (

            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >

              <h2 className="text-2xl font-bold">
                👤 {user.name}
              </h2>

              <p className="mt-4 text-gray-600">
                📧 {user.email}
              </p>

              <p className="mt-4 text-gray-500">

                Joined

                <br />

                <span className="font-semibold text-gray-800">

                  {new Date(
                    user.created_at
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}

                </span>

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default AdminUsers;