import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authorizeRoles, checkAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/all",
  checkAuth,
  // -> authorizeRoles(["admin", "user", "super-admin"]),
  getAllProducts
);

router.get(
  "/:id",
  checkAuth,
  // -> authorizeRoles(["admin", "user", "super-admin"]),
  getProductById
);

// Create Product
router.post(
  "/",
  checkAuth,
  authorizeRoles(["admin", "super-admin"]),
  createProduct
);

// Update Product
router.put(
  "/:id",
  checkAuth,
  authorizeRoles(["admin", "super-admin"]),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles(["admin", "super-admin"]),
  deleteProduct
);

export default router;
