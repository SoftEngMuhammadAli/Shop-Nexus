import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Protected (user)
export const createOrder = catchAsyncHandler(async (req, res) => {
  const { items, paymentMethod, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No items in the order" });
  }

  let totalAmount = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found: ${item.product}`,
      });
    }
    totalAmount += product.price * item.quantity;
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount,
    paymentMethod,
    shippingAddress,
  });

  const populatedOrder = await Order.findById(order._id)
    .populate("user", "name email")
    .populate("items.product", "name price");

  res.status(201).json({ success: true, data: populatedOrder });
});

// @desc   Get logged-in user’s orders
// @route  GET /api/orders/my
// @access Protected (user)
export const getUserOrders = catchAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "name price")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: orders.length, data: orders });
});

// @desc   Get single order by ID
// @route  GET /api/orders/:id
// @access Protected (user/admin)
export const getOrderById = catchAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.product", "name price");

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  res.json({ success: true, data: order });
});

// @desc   Get all orders (admin only)
// @route  GET /api/orders
// @access Protected (admin)
export const getAllOrders = catchAsyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product", "name price")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: orders.length, data: orders });
});

// @desc   Update order status (admin only)
// @route  PUT /api/orders/:id/status
// @access Protected (admin)
export const updateOrderStatus = catchAsyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json({ success: true, data: order });
});

// @desc   Delete order (admin only)
// @route  DELETE /api/orders/:id
// @access Protected (admin)
export const deleteOrder = catchAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  await order.deleteOne();

  res.json({ success: true, message: "Order removed", data: order });
});
