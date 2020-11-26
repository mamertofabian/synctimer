import express from "express";
import asyncHandler from "express-async-handler";
import TimerSet from "../models/timerSetModel.js";

const router = express.Router();

router.get(
  "/:key",
  asyncHandler(async (req, res) => {
    const timerSet = await TimerSet.findOne({ key: req.params.key });

    res.json(timerSet);
  })
);

export default router;
