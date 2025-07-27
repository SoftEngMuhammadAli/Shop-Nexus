import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT Token
export const generateToken = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed");
  }
};

// Hash Password
export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error("Error hashing password:", error.message);
    throw new Error("Password hashing failed");
  }
};

// Compare Password
export const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error.message);
    throw new Error("Password comparison failed");
  }
};
