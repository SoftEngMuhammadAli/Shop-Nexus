import {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

import express from "express";
const router = express.Router();

router.get("/products/all", getAllProducts);
router.post("/products/new", createProduct);
router.delete("/products/delete/:id", deleteProduct);
router.put("/products/update/:id", updateProduct);

export default router;
