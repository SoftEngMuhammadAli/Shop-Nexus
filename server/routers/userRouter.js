import {
  getUserProfileById,
  getUserProfiles,
} from "../controllers/userController.js";
import express from "express";
import { authorizeRoles, checkAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/all", checkAuth, authorizeRoles("admin"), getUserProfiles);

router.get(
  "/profile/:id",
  checkAuth,
  authorizeRoles("admin"),
  getUserProfileById
);

export default router;
