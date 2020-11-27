import mongoose from "mongoose";

const timerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  started: Date,
  ended: Date,
});

export default timerSchema;
