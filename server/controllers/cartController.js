import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

// Add to cart => /api/v1/cart
export const addToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Check if cart exists for user
  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Cart exists for user
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists in the cart, update the quantity
      let cartItem = cart.cartItems[itemIndex];
      cartItem.quantity += quantity;
      cart.cartItems[itemIndex] = cartItem;
    } else {
      // Product does not exists in cart, add new item
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
    // No cart for user, create new cart
    const newCart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, quantity, price: product.price }],
    });

    return res.status(201).json({
      success: true,
      cart: newCart,
    });
  }
});

// Get user cart => /api/v1/cart
export const getCart = catchAsyncErrors(async (req, res, next) => {
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
});

// Remove from cart => /api/v1/cart/:itemId
export const removeFromCart = catchAsyncErrors(async (req, res, next) => {
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
});

// Clear cart => /api/v1/cart/clear
export const clearCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user._id });

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});
