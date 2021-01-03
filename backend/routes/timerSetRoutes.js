import express from "express";

import {
  getAllTimerSets,
  getTimerSet,
  startTimer,
  stopTimer,
  resetAllTimers,
  saveTimerSet,
  deleteTimerSet,
} from "../controllers/timerSetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, getAllTimerSets);
router.route("/:key").get(getTimerSet);
router.route("/:key/start/:id").post(protect, startTimer);
router.route("/:key/stop/:id").post(protect, stopTimer);
router.route("/reset/:key").post(protect, resetAllTimers);
router.route("/save").post(protect, saveTimerSet);
router.route("/delete").post(protect, deleteTimerSet);

export default router;
