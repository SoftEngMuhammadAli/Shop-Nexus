import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import redis from "../utils/redisClient.js";

// @desc   Get logged-in user's cart
// @route  GET /api/cart
// @access Protected (user)
export const getCart = catchAsyncHandler(async (req, res) => {
  const cacheKey = `cart:${req.user._id}`;
  const cachedCart = await redis.get(cacheKey);

  if (cachedCart) {
    console.log("Returning cart from Redis cache");
    return res.json({ success: true, data: JSON.parse(cachedCart) });
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
    "name price"
  );

  if (!cart) {
    return res.json({ success: true, data: { items: [] } });
  }

  res.json({ success: true, data: cart });

  // Cache for 1 minute
  await redis.set(cacheKey, JSON.stringify(cart), { ex: 60 });
});

// @desc   Add item to cart
// @route  POST /api/cart
// @access Protected (user)
export const addToCart = catchAsyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cacheKey = `cart:${req.user._id}`;

  // Invalidate cache before updating
  await redis.del(cacheKey);

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    cart.items.push({ product: productId, quantity: quantity || 1 });
  }

  await cart.save();
  await cart.populate("items.product", "name price");

  res.status(201).json({ success: true, data: cart });

  // Update cache
  await redis.set(cacheKey, JSON.stringify(cart), { ex: 60 });
});

// @desc   Update item quantity
// @route  PUT /api/cart
// @access Protected (user)
export const updateCartItem = catchAsyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cacheKey = `cart:${req.user._id}`;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) {
    return res
      .status(404)
      .json({ success: false, message: "Item not in cart" });
  }

  item.quantity = quantity;
  await cart.save();
  await cart.populate("items.product", "name price");

  res.json({ success: true, data: cart });

  // Update cache
  await redis.set(cacheKey, JSON.stringify(cart), { ex: 60 });
});

// @desc   Remove item from cart
// @route  DELETE /api/cart/:productId
// @access Protected (user)
export const removeFromCart = catchAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cacheKey = `cart:${req.user._id}`;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);

  await cart.save();
  await cart.populate("items.product", "name price");

  res.json({ success: true, data: cart });

  // Update cache
  await redis.set(cacheKey, JSON.stringify(cart), { ex: 60 });
});

// @desc   Clear cart
// @route  DELETE /api/cart
// @access Protected (user)
export const clearCart = catchAsyncHandler(async (req, res) => {
  const cacheKey = `cart:${req.user._id}`;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.json({ success: true, message: "Cart already empty" });
  }

  cart.items = [];
  await cart.save();

  res.json({ success: true, message: "Cart cleared" });

  // Invalidate cache
  await redis.del(cacheKey);
});
