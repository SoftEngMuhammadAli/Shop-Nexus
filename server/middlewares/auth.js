import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Unified token verification (cookies + headers)
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

// Role-based access control
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("No user data found in request", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          403
        )
      );
    }

    next();
  };
};
