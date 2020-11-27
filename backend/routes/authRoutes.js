import express from "express";

import { getUserProfile, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.route("/profile").get(protect, getUserProfile);

export default router;
