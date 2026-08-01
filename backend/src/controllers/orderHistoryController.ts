import { Request, Response } from "express";
import * as orderHistoryService from "../services/orderHistoryService";

export async function getOrders(
  req: Request,
  res: Response
) {
  try {
    const userId = Number(req.params.userId);

    const orders =
      await orderHistoryService.getOrders(userId);

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}