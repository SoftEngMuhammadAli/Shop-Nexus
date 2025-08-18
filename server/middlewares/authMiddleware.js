import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

export const checkAuth = async (req, res, next) => {
  let token;

  // Check Authorization header first
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Fallback to cookies if needed
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new ErrorResponse(
        "Not authorized to access this route - no token provided",
        401
      )
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id)
      .select("-password -__v")
      .lean();

    if (!user) {
      return next(new ErrorResponse("No user found with this ID", 404));
    }

    if (!user.isActive) {
      return next(new ErrorResponse("User account is inactive", 403));
    }

    // Attach user to request
    req.user = user;

    // Continue to next middleware
    next();
  } catch (err) {
    // Handle different JWT errors specifically
    let message = "Not authorized to access this route";

    if (err.name === "TokenExpiredError") {
      message = "Session expired - please log in again";
    } else if (err.name === "JsonWebTokenError") {
      message = "Invalid token";
    }

    return next(new ErrorResponse(message, 401));
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userRole)) {
      return next(
        new ErrorResponse(
          `Role '${req.user.userRole}' is not authorized to access ${req.originalUrl}`,
          403
        )
      );
    }
    next();
  };
};

// // Optional: Middleware to set permissions in response locals
// export const setPermissions = (req, res, next) => {
//   res.locals.user = req.user;
//   res.locals.isAdmin = req.user?.userRole === "admin";
//   next();
// };
