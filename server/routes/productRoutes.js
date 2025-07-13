import express from "express";
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.get("/product/", getProducts);
router.get("/product/:id", getSingleProduct);

router.put("/product/review", isAuthenticatedUser, createProductReview);
router.get("/product/reviews", isAuthenticatedUser, getProductReviews);
router.delete("/product/reviews", isAuthenticatedUser, deleteReview);

// Admin routes
router.post(
  "/product/admin/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);
router.put(
  "/product/admin/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/product/admin/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;
