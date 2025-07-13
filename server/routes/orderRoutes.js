import express from "express";
import {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticatedUser, newOrder);
router.get("/:id", isAuthenticatedUser, getSingleOrder); // Fixed parameter
router.get("/me", isAuthenticatedUser, myOrders);

// Admin routes
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allOrders
);
router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrder
); // Fixed parameter
router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
); // Fixed parameter

export default router;
