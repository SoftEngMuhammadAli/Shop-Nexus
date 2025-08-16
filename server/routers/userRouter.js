import express from "express";
import {
  getUserProfileById,
  getUserProfiles,
  getUserProfileByName,
  getUserProfileByUserRole,
  createNewUser,
  updateUserById,
  deleteUserById,
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
} from "../controllers/userController.js";
import { authorizeRoles, checkAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==========================
// GET Users
// ==========================
router.get("/all", checkAuth, authorizeRoles("admin"), getUserProfiles);

router.get(
  "/profile/:id",
  checkAuth,
  authorizeRoles("admin"),
  getUserProfileById
);

router.get(
  "/profileByName/:name",
  checkAuth,
  authorizeRoles("admin"),
  getUserProfileByName
);

router.get(
  "/profileByRole/:userRole",
  checkAuth,
  authorizeRoles("admin"),
  getUserProfileByUserRole
);

// ==========================
// CREATE User (admin only)
// ==========================
router.post("/create", checkAuth, authorizeRoles("admin"), createNewUser);

// ==========================
// UPDATE User
// ==========================
router.put("/update/:id", checkAuth, authorizeRoles("admin"), updateUserById);

// ==========================
// DELETE User
// ==========================
router.delete(
  "/delete/:id",
  checkAuth,
  authorizeRoles("admin"),
  deleteUserById
);

// ==========================
// Self-Service Routes
// ==========================
router.get("/me", checkAuth, getMyProfile);
router.put("/me/update", checkAuth, updateMyProfile);
router.delete("/me/delete", checkAuth, deleteMyAccount);

export default router;
