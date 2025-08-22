import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import Like from "../models/Like.js";
import Product from "../models/Product.js";

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
});

// @desc   Get likes count for a product
// @route  GET /api/likes/:productId/count
// @access Public
export const getLikesCount = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const count = await Like.countDocuments({ product: productId });

  res.json({ success: true, productId, likes: count });
});

// @desc   Get all products liked by a user
// @route  GET /api/likes/my
// @access Protected (user)
export const getUserLikes = catchAsyncHandler(async (req, res) => {
  const likes = await Like.find({ likedBy: req.user._id }).populate(
    "product",
    "name price"
  );

  res.json({ success: true, count: likes.length, data: likes });
});
