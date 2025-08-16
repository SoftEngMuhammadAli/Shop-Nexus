import Product from "../models/Product.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import redis from "../utils/redisClient.js";

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

  // Invalidate cached products
  await redis.del("all_products");

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
  // Try Redis cache first
  let cachedProducts = await redis.get("all_products");

  if (cachedProducts) {
    console.log("Returning products from Redis cache");
    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully (from cache)",
      data: JSON.parse(cachedProducts),
    });
  }

  // Fallback to MongoDB
  const products = await Product.find({}).sort({ createdAt: -1 });

  // Save to Redis for next time
  await redis.set("all_products", JSON.stringify(products), { ex: 60 }); // cache for 60s

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
  const cacheKey = `product:${req.params.id}`;
  let cachedProduct = await redis.get(cacheKey);

  if (cachedProduct) {
    console.log("Returning product from Redis cache");
    return res.status(200).json({
      success: true,
      data: JSON.parse(cachedProduct),
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Save to Redis
  await redis.set(cacheKey, JSON.stringify(product), { ex: 120 }); // cache for 2 mins

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

  // Update cache
  await redis.set(`product:${req.params.id}`, JSON.stringify(product), {
    ex: 120,
  });
  await redis.del("all_products");

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

  // Remove from cache
  await redis.del(`product:${req.params.id}`);
  await redis.del("all_products");

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
