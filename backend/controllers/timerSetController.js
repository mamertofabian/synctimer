import asyncHandler from "express-async-handler";
import TimerSet from "../models/timerSetModel.js";

// @desc      Get Timer Set by key
// @route     POST /api/v1/timerset/:key
// @access    Public
const getTimerSet = asyncHandler(async (req, res) => {
  const timerSet = await TimerSet.findOne({ key: req.params.key });

  if (timerSet) {
    res.json({
      success: true,
      data: timerSet,
    });
  } else {
    res.status(404);
    throw new Error("Invalid timer key");
  }
});

export { getTimerSet };
