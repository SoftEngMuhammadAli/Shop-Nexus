import express from "express";
import { authorizeRoles, checkAuth } from "../middlewares/authMiddleware.js";
import {
  getAllSubscribers,
  subscribeToNewsLetter,
} from "../controllers/newsLetterController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Newsletter
 *   description: Newsletter subscription management
 */

/**
 * @swagger
 * /api/newsletter/subscribe:
 *   post:
 *     summary: Subscribe to the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Successfully subscribed to the newsletter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Subscribed successfully!
 *       400:
 *         description: Invalid request (email missing or already subscribed)
 *       500:
 *         description: Server error
 */
router.post("/subscribe", subscribeToNewsLetter);

/**
 * @swagger
 * /api/newsletter/all:
 *   get:
 *     summary: Get all newsletter subscribers
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subscribers (admin only)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 subscribers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64b0f8e9d93d1f9f9c8e1234
 *                       email:
 *                         type: string
 *                         example: user@example.com
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-07-13T14:48:00.000Z
 *       401:
 *         description: Unauthorized (no token or not admin)
 *       500:
 *         description: Server error
 */
router.get("/all", checkAuth, authorizeRoles("admin"), getAllSubscribers);

export default router;
