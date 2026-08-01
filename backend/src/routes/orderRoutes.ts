import {
  Router,
} from "express";

import {
  placeOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} from "../controllers/orderController";

import {
  verifyToken,
} from "../middleware/authMiddleware";

import {
  verifyAdmin,
} from "../middleware/adminMiddleware";

const router =
  Router();

// ==========================================
// CUSTOMER PLACES ORDER
// ==========================================

router.post(
  "/",
  placeOrder
);

// ==========================================
// ADMIN GETS ALL ORDERS
// Protected: Admin only
// ==========================================

router.get(
  "/admin/all",
  verifyToken,
  verifyAdmin,
  getAllOrders
);


router.get(
  "/admin/stats",
  getDashboardStats
);
// ==========================================
// ADMIN UPDATES ORDER STATUS
// Protected: Admin only
// ==========================================

router.put(
  "/admin/:id/status",
  verifyToken,
  verifyAdmin,
  updateOrderStatus
);

// ==========================================
// CUSTOMER GETS A SPECIFIC ORDER
// ==========================================

router.get(
  "/:id",
  getOrderById
);

export default router;