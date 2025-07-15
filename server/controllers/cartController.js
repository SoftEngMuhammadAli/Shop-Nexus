import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

// Add to cart => /api/v1/cart
export const addToCart = catchAsyncErrors(async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        let cartItem = cart.cartItems[itemIndex];
        cartItem.quantity += quantity;
        cart.cartItems[itemIndex] = cartItem;
      } else {
        cart.cartItems.push({
          product: productId,
          quantity,
          price: product.price,
        });
      }
      cart = await cart.save();
      return res.status(200).json({
        success: true,
        cart,
      });
    } else {
      const newCart = await Cart.create({
        user: req.user._id,
        cartItems: [{ product: productId, quantity, price: product.price }],
      });

      return res.status(201).json({
        success: true,
        cart: newCart,
      });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});

// Get user cart => /api/v1/cart
export const getCart = catchAsyncErrors(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "cartItems.product",
      "name price images"
    );

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});

// Remove from cart => /api/v1/cart/:itemId
export const removeFromCart = catchAsyncErrors(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );

    if (itemIndex > -1) {
      cart.cartItems.splice(itemIndex, 1);
      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});

// Clear cart => /api/v1/cart/clear
export const clearCart = catchAsyncErrors(async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Could not find to Delete Item" });
    }

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Interval Server Error" });
  }
});
