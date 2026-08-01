import { Router } from "express";
import { getOrders } from "../controllers/orderHistoryController";

const router = Router();

router.get("/:userId", getOrders);

export default router;