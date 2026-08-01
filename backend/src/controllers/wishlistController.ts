import { Request, Response } from "express";

import * as wishlistService from "../services/wishlist";

export async function addToWishlist(
  req: Request,
  res: Response
) {
  try {
    const { userId, productId } = req.body;

    const wishlist = await wishlistService.addToWishlist(
      userId,
      productId
    );

    res.status(201).json(wishlist);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getWishlist(
  req: Request,
  res: Response
) {
  try {
    const userId = Number(req.params.userId);

    const wishlist =
      await wishlistService.getWishlist(userId);

    res.json(wishlist);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function removeFromWishlist(
  req: Request,
  res: Response
) {
  try {
    const wishlistId = Number(req.params.id);

    const result =
      await wishlistService.removeFromWishlist(
        wishlistId
      );

    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}