import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/cart").post(isAuthenticatedUser, addToCart);
router.route("/cart").get(isAuthenticatedUser, getCart);
router.route("/cart/:itemId").delete(isAuthenticatedUser, removeFromCart);
router.route("/cart/clear").delete(isAuthenticatedUser, clearCart);

export default router;
