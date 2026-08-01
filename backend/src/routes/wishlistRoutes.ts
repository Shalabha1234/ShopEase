import { Router } from "express";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController";

const router = Router();

router.post("/", addToWishlist);

router.get("/:userId", getWishlist);

router.delete("/:id", removeFromWishlist);

export default router;