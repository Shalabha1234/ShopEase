import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../controllers/cartController";



const router = Router();

router.post("/", addToCart);

router.get("/:userId", getCart);

router.delete("/:id", removeFromCart);
router.put("/:id", updateQuantity);

export default router;