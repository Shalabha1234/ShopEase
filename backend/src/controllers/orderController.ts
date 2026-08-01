import {
  Request,
  Response,
} from "express";

import * as orderService
  from "../services/orderService";

// ==========================================
// PLACE ORDER
// ==========================================

export async function placeOrder(
  req: Request,
  res: Response
) {
  try {
    const order =
      await orderService.placeOrder(
        req.body
      );

    res
      .status(201)
      .json(order);

  } catch (error: any) {
    console.error(error);

    res
      .status(500)
      .json({
        message:
          error.message ||
          "Failed to place order",
      });
  }
}

// ==========================================
// GET ORDER BY ID
// ==========================================

export async function getOrderById(
  req: Request,
  res: Response
) {
  try {
    const id =
      Number(req.params.id);

    const order =
      await orderService.getOrderById(
        id
      );

    res.json(order);

  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({
        message:
          "Failed to fetch order",
      });
  }
}

// ==========================================
// GET ALL ORDERS
// ADMIN
// ==========================================

export async function getAllOrders(
  req: Request,
  res: Response
) {
  try {
    const orders =
      await orderService.getAllOrders();

    res.json(orders);

  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({
        message:
          "Failed to fetch orders",
      });
  }
}

// ==========================================
// UPDATE ORDER STATUS
// ADMIN
// ==========================================

export async function updateOrderStatus(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const updatedOrder =
      await orderService.updateOrderStatus(
        id,
        status
      );

    return res.json(updatedOrder);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update order status",
    });
  }
}
// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ADMIN
// ==========================================

export async function getDashboardStats(
  req: Request,
  res: Response
) {
  try {
    const stats =
      await orderService.getDashboardStats();

    res.json(stats);

  } catch (error) {
    console.error(
      "Failed to fetch dashboard stats:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch dashboard statistics",
    });
  }
}