import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
} from "../controllers/authController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/logout", logout);

router.post("/auth/password/forgot", forgotPassword);
router.put("/auth/password/reset/:token", resetPassword);

router.get("/auth/me", isAuthenticatedUser, getUserProfile);
router.put("/auth/password/update", isAuthenticatedUser, updatePassword);

export default router;
