import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticatedUser, addToCart);
router.get("/", isAuthenticatedUser, getCart);
router.delete("/:itemId", isAuthenticatedUser, removeFromCart);
router.delete("/clear", isAuthenticatedUser, clearCart);

export default router;
