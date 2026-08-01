import supabase from "../config/supabase";

// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================

export async function getDashboardStats() {

  // ==========================================
  // GET TOTAL PRODUCTS
  // ==========================================

  const {
    count: totalProducts,
    error: productsError,
  } = await supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (productsError) {
    throw productsError;
  }


  // ==========================================
  // GET TOTAL USERS
  // ==========================================

  const {
    count: totalUsers,
    error: usersError,
  } = await supabase
    .from("users")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (usersError) {
    throw usersError;
  }


  // ==========================================
  // GET ALL ORDERS
  // ==========================================

  const {
    data: orders,
    error: ordersError,
  } = await supabase
    .from("orders")
    .select("*");

  if (ordersError) {
    throw ordersError;
  }


  // ==========================================
  // CALCULATE ORDER STATISTICS
  // ==========================================

  const totalOrders =
    orders?.length || 0;

  const pendingOrders =
    orders?.filter(
      (order) =>
        order.status === "pending"
    ).length || 0;

  const deliveredOrders =
    orders?.filter(
      (order) =>
        order.status === "delivered"
    ).length || 0;


  // ==========================================
  // CALCULATE TOTAL REVENUE
  // ==========================================

  const totalRevenue =
    orders?.reduce(
      (total, order) =>
        total +
        Number(
          order.total_amount || 0
        ),
      0
    ) || 0;


  // ==========================================
  // RETURN DASHBOARD DATA
  // ==========================================

  return {
    totalProducts:
      totalProducts || 0,

    totalUsers:
      totalUsers || 0,

    totalOrders,

    pendingOrders,

    deliveredOrders,

    totalRevenue,
  };
}