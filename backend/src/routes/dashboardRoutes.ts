import { Router } from "express";

import {
  getDashboardStats,
} from "../controllers/dashboardController";

const router = Router();

// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================

router.get(
  "/stats",
  getDashboardStats
);

export default router;