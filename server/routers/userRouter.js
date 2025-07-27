import {
  getUserProfileById,
  getUserProfiles,
  getUserProfileByName,
  getUserProfileByUserRole,
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

export default router;
