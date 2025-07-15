import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "2h",
  });

  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRES_TIME || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
  };

  const { _id, name, email, role, user_type } = user;

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user: {
      _id,
      name,
      email,
      role,
      user_type,
    },
  });
};
