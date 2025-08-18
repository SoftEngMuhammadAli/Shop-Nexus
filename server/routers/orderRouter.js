import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { authorizeRoles, checkAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/create-order", checkAuth, authorizeRoles("user"), createOrder);
router.get("/my-orders", checkAuth, authorizeRoles("user"), getUserOrders);

router.get(
  "/get-order/:id",
  checkAuth,
  authorizeRoles(["user", "admin"]),
  getOrderById
);

// Admin routes
router.get("/all", checkAuth, authorizeRoles("admin"), getAllOrders);

router.put(
  "/admin/:id/status",
  checkAuth,
  authorizeRoles("admin"),
  updateOrderStatus
);

router.delete(
  "/admin/delete-order/:id",
  checkAuth,
  authorizeRoles("admin"),
  deleteOrder
);

export default router;
