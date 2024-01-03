import express from "express";
const router = express.Router();
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/profile", protect, profile);

export default router;
