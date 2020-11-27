import mongoose from "mongoose";
import timerSchema from "./timerModel.js";

const timerSetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    timeBudget: {
      type: Number,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    started: {
      type: Date,
    },
    ended: {
      type: Date,
    },
    active: Boolean,
    timers: [timerSchema],
  },
  {
    timestamps: true,
  }
);

const TimerSet = mongoose.model("TimerSet", timerSetSchema);

export default TimerSet;
