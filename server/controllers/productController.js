import Product from "../models/Product.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";

// ==========================
// CREATE PRODUCT
// ==========================
export const createProduct = catchAsyncHandler(async (req, res) => {
  const { productName, productDescription, productPrice, productQuantity } =
    req.body;

  const product = new Product({
    productName,
    productDescription,
    productPrice,
    productQuantity,
  });

  await product.save();

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// ==========================
// GET ALL PRODUCTS
// ==========================
export const getAllProducts = catchAsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });
});

// ==========================
// GET SINGLE PRODUCT BY ID
// ==========================
export const getProductById = catchAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// ==========================
// UPDATE PRODUCT
// ==========================
export const updateProduct = catchAsyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

// ==========================
// DELETE PRODUCT
// ==========================
export const deleteProduct = catchAsyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
