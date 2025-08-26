import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
import redisClient from "../utils/redisClient.js";

// @desc   Add product to wishlist
// @route  POST /api/wishlist/:productId
// @access Protected (user)
export const addToWishlist = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cacheKey = `wishlist:${req.user._id}`;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      products: [productId],
    });
  } else {
    if (wishlist.products.includes(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in wishlist" });
    }
    wishlist.products.push(productId);
    await wishlist.save();
  }

  const populatedWishlist = await Wishlist.findById(wishlist._id).populate(
    "products",
    "name price"
  );

  // Update cache
  await redisClient.set(cacheKey, JSON.stringify(populatedWishlist.products));

  res.status(201).json({ success: true, data: populatedWishlist });
});

// @desc   Get user wishlist
// @route  GET /api/wishlist
// @access Protected (user)
export const getWishlist = catchAsyncHandler(async (req, res) => {
  const cacheKey = `wishlist:${req.user._id}`;

  // Check Redis first
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return res.json({
      success: true,
      data: JSON.parse(cached),
      fromCache: true,
    });
  }

  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    "products",
    "name price"
  );

  if (!wishlist) {
    return res.json({ success: true, data: [] });
  }

  // Save to Redis
  await redisClient.set(cacheKey, JSON.stringify(wishlist.products));

  res.json({ success: true, data: wishlist.products });
});

// @desc   Remove product from wishlist
// @route  DELETE /api/wishlist/:productId
// @access Protected (user)
export const removeFromWishlist = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cacheKey = `wishlist:${req.user._id}`;

  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    return res
      .status(404)
      .json({ success: false, message: "Wishlist not found" });
  }

  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId
  );
  await wishlist.save();

  // Update cache
  await redisClient.set(cacheKey, JSON.stringify(wishlist.products));

  res.json({
    success: true,
    message: "Product removed",
    data: wishlist.products,
  });
});

// @desc   Clear wishlist
// @route  DELETE /api/wishlist
// @access Protected (user)
export const clearWishlist = catchAsyncHandler(async (req, res) => {
  const cacheKey = `wishlist:${req.user._id}`;

  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    return res
      .status(404)
      .json({ success: false, message: "Wishlist not found" });
  }

  wishlist.products = [];
  await wishlist.save();

  // Remove cache
  await redisClient.del(cacheKey);

  res.json({ success: true, message: "Wishlist cleared" });
});
