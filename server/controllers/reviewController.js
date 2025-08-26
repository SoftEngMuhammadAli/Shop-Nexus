import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import redisClient from "../utils/redisClient.js";

// @desc   Create a new review
// @route  POST /api/reviews/:productId
// @access Protected (user)
export const createReview = catchAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  const existingReview = await Review.findOne({
    user: req.user._id,
    product: productId,
  });

  if (existingReview) {
    return res
      .status(400)
      .json({ success: false, message: "You already reviewed this product" });
  }

  const review = await Review.create({
    user: req.user._id,
    product: productId,
    rating,
    comment,
  });

  // invalidate cache for product reviews
  await redisClient.del(`reviews:${productId}`);

  const populatedReview = await Review.findById(review._id)
    .populate("user", "name email")
    .populate("product", "name");

  res.status(201).json({ success: true, data: populatedReview });
});

// @desc   Get reviews for a product
// @route  GET /api/reviews/:productId
// @access Public
export const getProductReviews = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  // check cache first
  const cached = await redisClient.get(`reviews:${productId}`);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const reviews = await Review.find({ product: productId })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  const response = { success: true, count: reviews.length, data: reviews };

  // cache the result (expire in 1 hour)
  await redisClient.setEx(
    `reviews:${productId}`,
    3600,
    JSON.stringify(response)
  );

  res.json(response);
});

// @desc   Update a review
// @route  PUT /api/reviews/:id
// @access Protected (user)
export const updateReview = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(id);

  if (!review) {
    return res
      .status(404)
      .json({ success: false, message: "Review not found" });
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;
  await review.save();

  // invalidate cache for product reviews
  await redisClient.del(`reviews:${review.product.toString()}`);

  res.json({ success: true, data: review });
});

// @desc   Delete a review
// @route  DELETE /api/reviews/:id
// @access Protected (user/admin)
export const deleteReview = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);
  if (!review) {
    return res
      .status(404)
      .json({ success: false, message: "Review not found" });
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  await review.deleteOne();

  // invalidate cache for product reviews
  await redisClient.del(`reviews:${review.product.toString()}`);

  res.json({ success: true, message: "Review deleted" });
});

// @desc   Get all reviews (admin only)
// @route  GET /api/reviews
// @access Protected (admin)
export const getAllReviews = catchAsyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("user", "name email")
    .populate("product", "name")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: reviews.length, data: reviews });
});
