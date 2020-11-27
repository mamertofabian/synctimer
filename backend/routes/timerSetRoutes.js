import express from "express";

import {
  getTimerSet,
  startTimer,
  stopTimer,
} from "../controllers/timerSetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:key").get(getTimerSet);
router.route("/:key/start/:id").post(protect, startTimer);
router.route("/:key/stop/:id").post(protect, stopTimer);

export default router;
