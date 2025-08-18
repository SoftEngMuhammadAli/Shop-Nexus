import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Clean JSON response version of checkAuth
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
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route - no token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id)
      .select("-password -__v")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this ID",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "User account is inactive",
      });
    }

    // Attach user to request
    req.user = user;

    // Continue to next middleware
    next();
  } catch (err) {
    let message = "Not authorized to access this route";

    if (err.name === "TokenExpiredError") {
      message = "Session expired - please log in again";
    } else if (err.name === "JsonWebTokenError") {
      message = "Invalid token";
    }

    return res.status(401).json({
      success: false,
      message,
    });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    if (!roles.includes(req.user.userRole)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.userRole}' is not authorized to access this route`,
      });
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
