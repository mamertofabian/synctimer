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
});

export default timerSchema;
