import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import Like from "../models/Like.js";
import Product from "../models/Product.js";
import { redis } from "../utils/redisClient.js";

// @desc   Like a product
// @route  POST /api/likes/:productId
// @access Protected (user)
export const likeProduct = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  const like = await Like.findOne({
    product: productId,
    likedBy: req.user._id,
  });
  if (like) {
    return res.status(400).json({ success: false, message: "Already liked" });
  }

  const newLike = await Like.create({
    product: productId,
    likedBy: req.user._id,
  });

  res.status(201).json({ success: true, data: newLike });

  // Invalidate caches
  await redis.del(`likes:product:${productId}`);
  await redis.del(`likes:user:${req.user._id}`);
});

// @desc   Unlike a product
// @route  DELETE /api/likes/:productId
// @access Protected (user)
export const unlikeProduct = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const like = await Like.findOneAndDelete({
    product: productId,
    likedBy: req.user._id,
  });

  if (!like) {
    return res.status(404).json({ success: false, message: "Like not found" });
  }

  res.json({ success: true, message: "Product unliked" });

  // Invalidate caches
  await redis.del(`likes:product:${productId}`);
  await redis.del(`likes:user:${req.user._id}`);
});

// @desc   Get likes count for a product
// @route  GET /api/likes/:productId/count
// @access Public
export const getLikesCount = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cacheKey = `likes:product:${productId}`;

  const cachedLikes = await redis.get(cacheKey);
  if (cachedLikes) {
    console.log("Returning likes count from Redis cache");
    return res.json({
      success: true,
      fromCache: true,
      productId,
      likes: Number(cachedLikes),
    });
  }

  const count = await Like.countDocuments({ product: productId });

  res.json({ success: true, productId, likes: count });

  // Cache for 1 minute
  await redis.set(cacheKey, count, { ex: 60 });
});

// @desc   Get all products liked by a user
// @route  GET /api/likes/my
// @access Protected (user)
export const getUserLikes = catchAsyncHandler(async (req, res) => {
  const cacheKey = `likes:user:${req.user._id}`;

  const cachedLikes = await redis.get(cacheKey);
  if (cachedLikes) {
    console.log("Returning user likes from Redis cache");
    const parsed = JSON.parse(cachedLikes);
    return res.json({ success: true, fromCache: true, ...parsed });
  }

  const likes = await Like.find({ likedBy: req.user._id }).populate(
    "product",
    "name price"
  );

  const response = { count: likes.length, data: likes };

  res.json({ success: true, ...response });

  // Cache for 1 minute
  await redis.set(cacheKey, JSON.stringify(response), { ex: 60 });
});
