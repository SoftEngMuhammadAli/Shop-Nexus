// routes/blogRoutes.js
import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { checkAuth, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management
 *
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required: [title, slug, content, author]
 *       properties:
 *         _id: { type: string }
 *         title: { type: string }
 *         slug: { type: string }
 *         content: { type: string }
 *         author: { type: string }
 *         tags:
 *           type: array
 *           items: { type: string }
 *         coverImageUrl: { type: string }
 *         status: { type: string, enum: [draft, published] }
 *         readingTime: { type: number }
 *         publishedAt: { type: string, format: date-time }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     Error:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         message: { type: string }
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs (no pagination)
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [draft, published] }
 *       - in: query
 *         name: tag
 *         schema: { type: string, example: "nodejs" }
 *       - in: query
 *         name: search
 *         schema: { type: string, example: "redis" }
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get("/", checkAuth, getBlogs);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog created
 */
router.post("/create-blog", checkAuth, authorizeRoles("admin"), createBlog);

/**
 * @swagger
 * /api/blogs/{idOrSlug}:
 *   get:
 *     summary: Get a single blog by id or slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: idOrSlug
 *         schema: { type: string }
 *         required: true
 *         description: Mongo ObjectId or slug
 *     responses:
 *       200:
 *         description: Blog found
 *       404:
 *         description: Not found
 */
router.get("/:idOrSlug", checkAuth, getBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated
 *       404:
 *         description: Not found
 */
router.put(
  "/:id",
  checkAuth,
  authorizeRoles(["admin", "super-admin"]),
  updateBlog
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: Blog deleted
 *       404:
 *         description: Not found
 */
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles(["admin", "super-admin"]),
  deleteBlog
);

export default router;
