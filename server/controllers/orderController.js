import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

// Create new order => /api/v1/order/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
    } = req.body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Error Not Found!" });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});

// Get single order => /api/v1/order/:id
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});

// Get logged in user orders => /api/v1/orders/me
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
      return res.status(404).json({ message: "Error, Not Found!" });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});

// Get all orders - ADMIN => /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({});

  if (!orders) {
    return res.status(404).json({ message: "Error 404 not found!" });
  }

  try {
    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});

// Update / Process order - ADMIN => /api/v1/admin/order/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Error 404 not found!" });
  }

  try {
    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );
    }

    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  try {
    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
}

// Delete order => /api/v1/admin/order/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  try {
    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    await order.remove();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});
