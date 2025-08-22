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

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /api/orders/create-order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - paymentMethod
 *               - shippingAddress
 *             properties:
 *               items:
 *                 type: array
 *                 description: List of products in the order
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: Product ID
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               paymentMethod:
 *                 type: string
 *                 example: "Credit Card"
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Street, City, Country"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: No items in the order
 */
router.post("/create-order", checkAuth, authorizeRoles("user"), createOrder);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 */
router.get("/my-orders", checkAuth, authorizeRoles("user"), getUserOrders);

/**
 * @swagger
 * /api/orders/get-order/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       403:
 *         description: Not authorized to view this order
 *       404:
 *         description: Order not found
 */
router.get(
  "/get-order/:id",
  checkAuth,
  authorizeRoles(["user", "admin"]),
  getOrderById
);

/**
 * @swagger
 * /api/orders/all:
 *   get:
 *     summary: Get all orders (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       403:
 *         description: Forbidden
 */
router.get("/all", checkAuth, authorizeRoles("admin"), getAllOrders);

/**
 * @swagger
 * /api/orders/admin/{id}/status:
 *   put:
 *     summary: Update order status (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Shipped"
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 */
router.put(
  "/admin/:id/status",
  checkAuth,
  authorizeRoles("admin"),
  updateOrderStatus
);

/**
 * @swagger
 * /api/orders/admin/delete-order/{id}:
 *   delete:
 *     summary: Delete an order (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order removed successfully
 *       404:
 *         description: Order not found
 */
router.delete(
  "/admin/delete-order/:id",
  checkAuth,
  authorizeRoles("admin"),
  deleteOrder
);

export default router;
