import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

// @desc   Add product to wishlist
// @route  POST /api/wishlist/:productId
// @access Protected (user)
export const addToWishlist = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;

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

  res.status(201).json({ success: true, data: populatedWishlist });
});

// @desc   Get user wishlist
// @route  GET /api/wishlist
// @access Protected (user)
export const getWishlist = catchAsyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    "products",
    "name price"
  );

  if (!wishlist) {
    return res.json({ success: true, data: [] });
  }

  res.json({ success: true, data: wishlist.products });
});

// @desc   Remove product from wishlist
// @route  DELETE /api/wishlist/:productId
// @access Protected (user)
export const removeFromWishlist = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;

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
  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    return res
      .status(404)
      .json({ success: false, message: "Wishlist not found" });
  }

  wishlist.products = [];
  await wishlist.save();

  res.json({ success: true, message: "Wishlist cleared" });
});
