import { catchAsyncHandler } from "../middlewares/errorHandler.js";
import User from "../models/User.js";
import { generateToken } from "../utils/authHelpers.js";
import { redis } from "../utils/redisClient.js";

// ==========================
// GET Single User by ID
// ==========================
export const getUserProfileById = catchAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;

  let cachedUser = await redis.get(cacheKey);
  if (cachedUser) {
    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully (from cache)",
      data: JSON.parse(cachedUser),
    });
  }

  const user = await User.findById(userId).select("-password -__v");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await redis.set(cacheKey, JSON.stringify(user), { ex: 300 });

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
  const cacheKey = "all_users";

  let cachedUsers = await redis.get(cacheKey);
  if (cachedUsers) {
    return res.status(200).json({
      success: true,
      message: "All user profiles retrieved successfully (from cache)",
      data: cachedUsers,
    });
  }

  const users = await User.find({})
    .select("-password -__v")
    .sort({ createdAt: -1 });

  await redis.set(cacheKey, JSON.stringify(users), { ex: 300 });

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
  const cacheKey = `usersByName:${username.toLowerCase()}`;

  let cachedUsers = await redis.get(cacheKey);
  if (cachedUsers) {
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully (from cache)",
      data: JSON.parse(cachedUsers),
    });
  }

  const users = await User.find({ name: username }).select("-password -__v");

  if (!users.length) {
    return res.status(404).json({
      success: false,
      message: `No users found with name: ${username}`,
    });
  }

  await redis.set(cacheKey, JSON.stringify(users), { ex: 300 });

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

  const cacheKey = `usersByRole:${role.toLowerCase()}`;

  let cachedUsers = await redis.get(cacheKey);
  if (cachedUsers) {
    return res.status(200).json({
      success: true,
      message: `Users with role "${role}" fetched successfully (from cache)`,
      data: JSON.parse(cachedUsers),
    });
  }

  const usersByRole = await User.find({
    userRole: { $regex: new RegExp(`^${role}$`, "i") },
  }).select("-password -__v");

  if (!usersByRole.length) {
    return res
      .status(404)
      .json({ message: `No users found with role: ${role}` });
  }

  await redis.set(cacheKey, JSON.stringify(usersByRole), { ex: 300 });

  return res.status(200).json({
    success: true,
    message: `Users with role "${role}" fetched successfully`,
    data: usersByRole,
  });
});

// ==========================
// CREATE User
// ==========================
export const createNewUser = catchAsyncHandler(async (req, res) => {
  const { name, email, password, userRole, profilePicture, bio } = req.body;

  const newUser = new User({
    name,
    email,
    password, // hash if needed
    userRole,
    profilePicture,
    bio,
  });

  await newUser.save();

  // Invalidate related caches
  await redis.del("all_users");

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});

// ==========================
// UPDATE User By ID
// ==========================
export const updateUserById = catchAsyncHandler(async (req, res) => {
  const userId = req.params.id;

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  }).select("-password -__v");

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Update cache
  await redis.set(`user:${userId}`, JSON.stringify(updatedUser), { ex: 300 });
  await redis.del("all_users");

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

// ==========================
// DELETE User By ID
// ==========================
export const deleteUserById = catchAsyncHandler(async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Invalidate cache
  await redis.del(`user:${userId}`);
  await redis.del("all_users");

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// ==========================
// GET Self Service Controllers
// ==========================

// ==========================
// GET My Profile
// ==========================
export const getMyProfile = catchAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -__v");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "My profile retrieved successfully",
    data: user,
  });
});

// ==========================
// UPDATE My Profile
// ==========================
export const updateMyProfile = catchAsyncHandler(async (req, res) => {
  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  }).select("-password -__v");

  if (!updatedUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

// ==========================
// DELETE My Account
// ==========================
export const deleteMyAccount = catchAsyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user.id);

  if (!deletedUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "Your account has been deleted successfully",
  });
});
