import express from "express";
import {
  likeProduct,
  unlikeProduct,
  getLikesCount,
  getUserLikes,
} from "../controllers/likeController.js";
import { checkAuth, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Product like management
 */

/**
 * @swagger
 * /api/likes/{productId}:
 *   post:
 *     summary: Like a product
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       201:
 *         description: Product liked successfully
 *       400:
 *         description: Already liked
 */
router.post("/:productId", checkAuth, authorizeRoles("user"), likeProduct);

/**
 * @swagger
 * /api/likes/{productId}:
 *   delete:
 *     summary: Unlike a product
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product unliked
 *       404:
 *         description: Like not found
 */
router.delete("/:productId", checkAuth, authorizeRoles("user"), unlikeProduct);

/**
 * @swagger
 * /api/likes/{productId}/count:
 *   get:
 *     summary: Get like count for a product
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Number of likes for a product
 */
router.get("/:productId/count", getLikesCount);

/**
 * @swagger
 * /api/likes/my:
 *   get:
 *     summary: Get all products liked by logged-in user
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products liked by the user
 */
router.get("/my", checkAuth, authorizeRoles("user"), getUserLikes);

export default router;
