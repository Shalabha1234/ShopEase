import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

type AdminRouteProps = {
  children: ReactNode;
};

function AdminRoute({
  children,
}: AdminRouteProps) {
  const {
    user,
    isLoggedIn,
    isLoading,
  } = useAuth();

  // Wait for authentication
  // to finish loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Checking authentication...
        </div>
      </div>
    );
  }

  // User is not logged in
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // User is logged in
  // but is not an admin
  if (!user || user.is_admin !== true) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // User is an admin
  return <>{children}</>;
}

export default AdminRoute;