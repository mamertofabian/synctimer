import express from "express";

import {
  forgotPassword,
  getUserProfile,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.route("/profile").get(protect, getUserProfile);

export default router;
