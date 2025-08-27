import User from "../models/User.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import {
  generateToken,
  hashPassword,
  comparePasswords,
} from "../utils/authHelpers.js";
import { redis } from "../utils/redisClient.js";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = catchAsyncHandler(async (req, res) => {
  let { name, email, password, userRole, profilePicture, bio } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required.",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists.",
    });
  }

  const hashed = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    password: hashed,
    userRole,
    profilePicture,
    bio,
  });

  await newUser.save();

  const token = generateToken(newUser._id);

  // Store session in Redis (so we can validate quickly later)
  await redis.set(`user:${newUser._id}`, JSON.stringify(newUser), {
    ex: 60 * 60,
  }); // 1 hr cache

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      userRole: newUser.userRole,
      profilePicture: newUser.profilePicture,
      bio: newUser.bio,
    },
  });
});

// ==========================
// LOGIN USER
// ==========================
export const loginUser = catchAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  // Check cache first
  let cachedUser = await redis.get(`userByEmail:${email}`);
  let user;

  if (cachedUser) {
    console.log("User retrieved from Redis");
    user = cachedUser;
  } else {
    user = await User.findOne({ email }).select("+password");
    if (user) {
      await redis.set(`userByEmail:${email}`, JSON.stringify(user), {
        ex: 300,
      }); // cache for 5 min
    }
  }

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  const token = generateToken(user._id);
  user.password = undefined;

  // Track session in Redis
  await redis.set(`session:${user._id}`, token, { ex: 7 * 24 * 60 * 60 }); // 7 days

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      userRole: user.userRole,
      profilePicture: user.profilePicture,
      bio: user.bio,
    },
  });
});

// ==========================
// LOGOUT USER
// ==========================
export const logoutUser = catchAsyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    // Blacklist token in Redis so it can’t be reused
    await redis.set(`blacklist:${token}`, "true", { ex: 7 * 24 * 60 * 60 }); // expires after 7 days
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

// ==========================
// Refresh Token
// ==========================
export const refreshToken = catchAsyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required" });
  }

  try {
    // Verify old token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract user ID
    const userId = decoded.id;

    // Generate new token
    const newToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: { token: newToken },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
});

// ==========================
// Reset Password
// ==========================
export const resetPassword = catchAsyncHandler(async (req, res) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

// ==========================
// Request Password Reset
// ==========================
export const requestPasswordReset = catchAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${resetToken}`;

  const message = `Click the link to reset your password: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ success: false, message: error.message });
  }
});
