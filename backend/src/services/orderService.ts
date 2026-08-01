import supabase from "../config/supabase";

type OrderData = {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: string;
  totalAmount: number;
};

// ==========================================
// PLACE ORDER
// ==========================================

export async function placeOrder(
  order: OrderData
) {
  // Create order
  const {
    data: createdOrder,
    error: orderError,
  } = await supabase
    .from("orders")
    .insert([
      {
        user_id: order.userId,
        full_name: order.fullName,
        email: order.email,
        phone: order.phone,
        address: order.address,
        city: order.city,
        state: order.state,
        pin_code: order.pinCode,
        payment_method:
          order.paymentMethod,
        total_amount:
          order.totalAmount,
      },
    ])
    .select()
    .single();

  if (orderError) {
    throw orderError;
  }

  // Fetch user's cart
  const {
    data: cartItems,
    error: cartError,
  } = await supabase
    .from("cart")
    .select(`
      quantity,
      product_id,
      products(price)
    `)
    .eq(
      "user_id",
      order.userId
    );

  if (cartError) {
    throw cartError;
  }

  if (
    !cartItems ||
    cartItems.length === 0
  ) {
    throw new Error(
      "Cart is empty"
    );
  }

  // Insert order items
  const items =
    cartItems.map(
      (item: any) => ({
        order_id:
          createdOrder.id,

        product_id:
          item.product_id,

        quantity:
          item.quantity,

        price:
          item.products.price,
      })
    );

  const {
    error: itemError,
  } =
    await supabase
      .from("order_items")
      .insert(items);

  if (itemError) {
    throw itemError;
  }

  // Clear user's cart
  const {
    error: clearError,
  } =
    await supabase
      .from("cart")
      .delete()
      .eq(
        "user_id",
        order.userId
      );

  if (clearError) {
    throw clearError;
  }

  return createdOrder;
}

// ==========================================
// GET ORDER BY ID
// ==========================================

export async function getOrderById(
  id: number
) {
  const {
    data,
    error,
  } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        quantity,
        price,
        products (
          name,
          image
        )
      )
    `)
    .eq(
      "id",
      id
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// GET ALL ORDERS FOR ADMIN
// ==========================================

export async function getAllOrders() {
  const {
    data,
    error,
  } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        quantity,
        price,
        products (
          name,
          image
        )
      )
    `)
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

export async function updateOrderStatus(
  id: number,
  status: string
) {
  const {
    data,
    error,
  } = await supabase
    .from("orders")
    .update({
      status: status,
    })
    .eq(
      "id",
      id
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================

export async function getDashboardStats() {
  // Get all orders
  const {
    data: orders,
    error,
  } = await supabase
    .from("orders")
    .select("total_amount, status");

  if (error) {
    throw error;
  }

  const totalOrders =
    orders?.length || 0;

  const pendingOrders =
    orders?.filter(
      (order) =>
        order.status === "Pending"
    ).length || 0;

  const deliveredOrders =
    orders?.filter(
      (order) =>
        order.status === "Delivered"
    ).length || 0;

  const totalRevenue =
    orders?.reduce(
      (total, order) =>
        total +
        Number(order.total_amount),
      0
    ) || 0;

  return {
    totalOrders,
    pendingOrders,
    deliveredOrders,
    totalRevenue,
  };
}