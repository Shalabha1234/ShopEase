// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================
const API_URL = import.meta.env.VITE_API_URL;
export async function getDashboardStats() {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/dashboard/stats`,
    {
      method: "GET",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData =
      await response.json();

    throw new Error(
      errorData.message ||
      "Failed to fetch dashboard statistics"
    );
  }

  return response.json();
}