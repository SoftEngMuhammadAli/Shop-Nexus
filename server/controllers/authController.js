import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// Register user => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/default_avatar_id",
      url: "https://res.cloudinary.com/your-cloud-name/image/upload/v1620000000/avatars/default_avatar.jpg",
    },
  });

  sendToken(user, 201, res);
});

// Forgot password => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "E-Commerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password => /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// Logout user => /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    console.error(`Error Occured: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
});
