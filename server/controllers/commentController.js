import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import Comment from "../models/Comment.js";
import Product from "../models/Product.js";
import redis from "../utils/redisClient.js";

// @desc   Add a comment to a product
// @route  POST /api/comments/:productId
// @access Protected (user)
export const addComment = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { commentContent } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  const comment = await Comment.create({
    product: productId,
    commentedBy: req.user._id,
    commentContent,
  });

  const populatedComment = await comment.populate("commentedBy", "name email");

  res.status(201).json({ success: true, data: populatedComment });

  // Invalidate product comments cache + user comments cache
  await redis.del(`comments:product:${productId}`);
  await redis.del(`comments:user:${req.user._id}`);
});

// @desc   Delete a comment
// @route  DELETE /api/comments/:id
// @access Protected (owner/admin)
export const deleteComment = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    return res
      .status(404)
      .json({ success: false, message: "Comment not found" });
  }

  if (
    comment.commentedBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  await comment.deleteOne();

  res.json({ success: true, message: "Comment deleted" });

  // Invalidate cache
  await redis.del(`comments:product:${comment.product}`);
  await redis.del(`comments:user:${comment.commentedBy}`);
});

// @desc   Get all comments for a product
// @route  GET /api/comments/:productId
// @access Public
export const getProductComments = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cacheKey = `comments:product:${productId}`;

  const cachedComments = await redis.get(cacheKey);
  if (cachedComments) {
    console.log("Returning product comments from Redis cache");
    return res.json({
      success: true,
      fromCache: true,
      ...JSON.parse(cachedComments),
    });
  }

  const comments = await Comment.find({ product: productId })
    .populate("commentedBy", "name email")
    .sort({ createdAt: -1 });

  const response = { count: comments.length, data: comments };

  res.json({ success: true, ...response });

  // Cache for 1 minute
  await redis.set(cacheKey, JSON.stringify(response), { ex: 60 });
});

// @desc   Get all comments by logged-in user
// @route  GET /api/comments/my
// @access Protected (user)
export const getUserComments = catchAsyncHandler(async (req, res) => {
  const cacheKey = `comments:user:${req.user._id}`;

  const cachedComments = await redis.get(cacheKey);
  if (cachedComments) {
    console.log("Returning user comments from Redis cache");
    return res.json({
      success: true,
      fromCache: true,
      ...JSON.parse(cachedComments),
    });
  }

  const comments = await Comment.find({ commentedBy: req.user._id })
    .populate("product", "name price")
    .sort({ createdAt: -1 });

  const response = { count: comments.length, data: comments };

  res.json({ success: true, ...response });

  // Cache for 1 minute
  await redis.set(cacheKey, JSON.stringify(response), { ex: 60 });
});
