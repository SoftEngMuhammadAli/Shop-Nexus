import express from "express";
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getAllReviews,
} from "../controllers/reviewController.js";
import { checkAuth, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product review management
 */

/**
 * @swagger
 * /api/reviews/{productId}:
 *   post:
 *     summary: Create a review for a product
 *     tags: [Reviews]
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
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Amazing product!"
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Already reviewed
 */
router.post("/:productId", checkAuth, authorizeRoles("user"), createReview);

/**
 * @swagger
 * /api/reviews/{productId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get("/:productId", getProductReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Updated comment"
 *     responses:
 *       200:
 *         description: Review updated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Review not found
 */
router.put("/:id", checkAuth, authorizeRoles(["user", "admin"]), updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Review not found
 */
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles(["user", "admin"]),
  deleteReview
);

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews (admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reviews
 *       403:
 *         description: Forbidden
 */
router.get("/", checkAuth, authorizeRoles("admin"), getAllReviews);

export default router;
