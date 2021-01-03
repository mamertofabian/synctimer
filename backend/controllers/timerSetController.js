import crypto from "crypto";

import asyncHandler from "express-async-handler";
import TimerSet from "../models/timerSetModel.js";

// @desc      Get all timersets
// @route     POST /api/v1/timerset
// @access    Private
const getAllTimerSets = asyncHandler(async (req, res) => {
  const timerSets = await TimerSet.find({ user: req.user });

  if (timerSets) {
    res.json({
      success: true,
      data: timerSets,
      token: req.user.token,
    });
  } else {
    res.status(404);
    throw new Error("Cannot retrieve timer sets");
  }
});

// @desc      Get Timer Set by key
// @route     GET /api/v1/timerset/:key
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

// @desc      Save Timer Set
// @route     POST /api/v1/timerset/save
// @access    Private
const saveTimerSet = asyncHandler(async (req, res) => {
  const editedTimerSet = req.body.timerSet;
  editedTimerSet.user = req.user;

  if (!editedTimerSet.key) {
    editedTimerSet.key = crypto.randomBytes(7).toString("hex");
  }

  try {
    let timerSet = {};
    if (editedTimerSet._id) {
      timerSet = await TimerSet.findByIdAndUpdate(
        editedTimerSet._id,
        editedTimerSet,
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      timerSet = await TimerSet.create(editedTimerSet);
    }

    res.status(200).json({
      success: true,
      data: timerSet,
    });
  } catch (error) {
    console.log({ error });
    res.status(404);
    throw new Error("Error saving timerset");
  }
});

// @desc      Delete Timer Set
// @route     POST /api/v1/timerset/delete
// @access    Private
const deleteTimerSet = asyncHandler(async (req, res) => {
  const key = req.body.key;
  if (!key) {
    res.status(404);
    throw new Error("Timerset key not provided");
  }

  try {
    const timerSet = await TimerSet.findOne({ key });
    if (!timerSet) {
      res.status(404);
      throw new Error("Timer Set not found");
    }

    if (timerSet && timerSet.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Cannot delete other user's timerset");
    } else {
      await timerSet.remove();
      res.status(200).json({
        success: true,
        data: key,
      });
    }
  } catch (error) {
    console.log({ error });
    res.status(404);
    throw new Error("Error deleting timerset");
  }
});

// @desc      Start timer by id
// @route     POST /api/v1/timerset/:key/start/:id
// @access    Private
const startTimer = asyncHandler(async (req, res) => {
  const timerSet = await TimerSet.findOne({ key: req.params.key }).lean();

  if (timerSet) {
    if (timerSet.activeTimerId) {
      res.status(403);
      throw new Error("Cannot start when another time is active");
    }

    const timer = timerSet.timers.find(
      (t) => t._id.toString() === req.params.id
    );

    if (timer) {
      if (timer.ended) {
        timer.ended = undefined;
      }
      timer.started = Date.now();
      timerSet.activeTimerId = timer._id.toString();
      await TimerSet.updateOne({ key: timerSet.key }, timerSet);

      res.json({
        success: true,
        data: timer,
      });
    } else {
      res.status(404);
      throw new Error("Invalid timer id");
    }
  } else {
    res.status(404);
    throw new Error("Invalid timerset key");
  }
});

// @desc      Stop timer by id
// @route     POST /api/v1/timerset/:key/stop/:id
// @access    Private
const stopTimer = asyncHandler(async (req, res) => {
  const timerSet = await TimerSet.findOne({ key: req.params.key }).lean();

  if (timerSet) {
    const timer = timerSet.timers.find(
      (t) => t._id.toString() === req.params.id
    );

    if (timer) {
      if (timer.ended) {
        res.status(403);
        throw new Error("Timer already ended");
      }

      timer.ended = Date.now();
      timerSet.activeTimerId = undefined;
      await TimerSet.updateOne({ key: timerSet.key }, timerSet);

      res.json({
        success: true,
        data: timer,
      });
    } else {
      res.status(404);
      throw new Error("Invalid timer id");
    }
  } else {
    res.status(404);
    throw new Error("Invalid timerset key");
  }
});

// @desc      Reset all timers
// @route     POST /api/v1/timerset/reset/:key
// @access    Private
const resetAllTimers = asyncHandler(async (req, res) => {
  const timerSet = await TimerSet.findOne({ key: req.params.key }).lean();

  if (timerSet) {
    for (let index = 0; index < timerSet.timers.length; index++) {
      const timer = timerSet.timers[index];
      timer.started = undefined;
      timer.ended = undefined;
    }
    timerSet.activeTimerId = undefined;
    await TimerSet.updateOne({ key: timerSet.key }, timerSet);

    res.json({
      success: true,
      data: timerSet,
      token: req.user.token,
    });
  } else {
    res.status(404);
    throw new Error("Invalid timerset key");
  }
});

export {
  getAllTimerSets,
  getTimerSet,
  startTimer,
  stopTimer,
  resetAllTimers,
  saveTimerSet,
  deleteTimerSet,
};
