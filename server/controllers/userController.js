import User from "../models/User.js";

// ==========================
// GET Single User by ID
// ==========================
export const getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in getUserProfileById:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
// GET All Users
// ==========================
export const getUserProfiles = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -__v");

    return res.status(200).json({
      success: true,
      message: "All user profiles retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error in getUserProfiles:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
// GET User By Name (TODO)
// ==========================

// ==========================
// GET User By Role (TODO)
// ==========================
