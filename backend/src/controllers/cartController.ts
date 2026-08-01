import { Request, Response } from "express";
import * as cartService from "../services/cartService";

export async function addToCart(
  req: Request,
  res: Response
) {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await cartService.addToCart(
      userId,
      productId,
      quantity
    );

    res.status(201).json(cart);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function getCart(
  req: Request,
  res: Response
) {
  try {
    const userId = Number(req.params.userId);

    const cart = await cartService.getCart(userId);

    res.json(cart);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function removeFromCart(
  req: Request,
  res: Response
) {
  try {
    const cartId = Number(req.params.id);

    const result =
      await cartService.removeFromCart(cartId);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}
export async function updateQuantity(
  req: Request,
  res: Response
) {
  try {
    const cartId = Number(req.params.id);
    const { quantity } = req.body;

    const item =
      await cartService.updateQuantity(
        cartId,
        quantity
      );

    res.json(item);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}