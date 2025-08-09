// userController.js
import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import User from "../models/User.js";

// ==========================
// GET Single User by ID
// ==========================
export const getUserProfileById = catchAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password -__v");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "User profile retrieved successfully",
    data: user,
  });
});

// ==========================
// GET All Users
// ==========================
export const getUserProfiles = catchAsyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password -__v");

  res.status(200).json({
    success: true,
    message: "All user profiles retrieved successfully",
    data: users,
  });
});

// ==========================
// GET User By Name
// ==========================
export const getUserProfileByName = catchAsyncHandler(async (req, res) => {
  const username = req.params.name;
  const users = await User.find({ name: username }).select("-password -__v");

  if (!users.length) {
    return res.status(404).json({
      success: false,
      message: `No users found with name: ${username}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

// ==========================
// GET User By Role
// ==========================
export const getUserProfileByUserRole = catchAsyncHandler(async (req, res) => {
  const role = req.params.userRole;

  if (!role) {
    return res.status(400).json({ message: "Role parameter is required" });
  }

  const usersByRole = await User.find({
    userRole: { $regex: new RegExp(`^${role}$`, "i") },
  }).select("-password -__v");

  if (!usersByRole.length) {
    return res
      .status(404)
      .json({ message: `No users found with role: ${role}` });
  }

  return res.status(200).json({
    success: true,
    message: `Users with role "${role}" fetched successfully`,
    data: usersByRole,
  });
});

// ==========================
// UPDATE User By ID (TODO)
// ==========================

// ==========================
// GET User By Role (TODO)
// ==========================

// ==========================
// DELETE User By ID (TODO)
// ==========================

// ==========================
// CREATE User (TODO)
// ==========================
export const createNewUser = catchAsyncHandler(async (req, res) => {
  
});
