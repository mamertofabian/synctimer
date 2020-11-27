import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: [true, "Please add a refresh token"],
    trim: true,
  },
});

export default mongoose.model("RefreshToken", RefreshTokenSchema);
