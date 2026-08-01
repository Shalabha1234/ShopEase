import {
  Request,
  Response,
} from "express";

import * as dashboardService
  from "../services/dashboardService";

// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================

export async function getDashboardStats(
  req: Request,
  res: Response
) {
  try {
    const stats =
      await dashboardService.getDashboardStats();

    res.json(stats);

  } catch (error: any) {

    console.error(
      "Failed to fetch dashboard statistics:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Failed to fetch dashboard statistics",
    });
  }
}