import express from "express";
import {
  addComment,
  deleteComment,
  getProductComments,
  getUserComments,
} from "../controllers/commentController.js";
import { checkAuth, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Product comment management
 */

/**
 * @swagger
 * /api/comments/{productId}:
 *   post:
 *     summary: Add a comment to a product
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentContent
 *             properties:
 *               commentContent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 */
router.post("/:productId", checkAuth, authorizeRoles("user"), addComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment (owner or admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       403:
 *         description: Not authorized
 */
router.delete("/:id", checkAuth, deleteComment);

/**
 * @swagger
 * /api/comments/{productId}:
 *   get:
 *     summary: Get all comments for a product
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of comments for a product
 */
router.get("/:productId", getProductComments);

/**
 * @swagger
 * /api/comments/my:
 *   get:
 *     summary: Get all comments by logged-in user
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user’s comments
 */
router.get("/my", checkAuth, authorizeRoles("user"), getUserComments);

export default router;
