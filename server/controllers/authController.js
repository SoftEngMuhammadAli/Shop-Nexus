import User from "../models/User.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import {
  generateToken,
  hashPassword,
  comparePasswords,
} from "../utils/authHelpers.js";

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

  const user = await User.findOne({ email }).select("+password");
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
