import crypto from "crypto";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import sendEmail from "../utils/sendEmail.js";
import User from "../models/userModel.js";
import RefreshToken from "../models/refreshTokenModel.js";

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validates email & password
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide an email and password");
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log(`No user found with email ${email}`);
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    console.log(`Incorrect password ${password}`);
    res.status(401);
    throw new Error("Invalid credentials");
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Log out user / clear cookie / delete refreshtoken
// @route     POST /api/v1/auth/logout
// @access    Private
export const logout = asyncHandler(async (req, res, next) => {
  // Delete refresh token
  await RefreshToken.deleteOne({ refreshToken: req.body.refreshToken });

  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Create a new access token
// @route     POST /api/v1/auth/token
// @access    Private
export const token = asyncHandler(async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  const existingRefreshToken = await RefreshToken.findOne({
    refreshToken: refreshToken,
  });
  if (existingRefreshToken) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      async (err, userInfo) => {
        if (err) return res.sendStatus(403);

        const user = await User.findById(userInfo.id);
        const accessToken = user.getSignedJwtToken();

        res.status(200).json({
          success: true,
          data: {
            accessToken,
            refreshToken,
          },
        });
      }
    );
  } else {
    res.status(403).json({
      success: false,
      data: {},
    });
  }
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user details automatically
// @route     PUT /api/v1/auth/updateuserdetails
// @access    Private
export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  user.password = fieldsToUpdate.password;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!req.body.newPassword || !req.body.currentPassword) {
    res.status(400);
    throw new Error("Current password and new password are required");
  }

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    res.status(401);
    throw new Error("Password is incorrect");
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("There is no user with that email");
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({
    validateBeforeSave: false,
  });

  // Create reset url
  // const resetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/auth/resetpassword/${resetToken}`;
  const resetUrl = `https://account.usedelight.com/password-reset/?resettoken=${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested to reset your password. Please follow this link to continue: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({
      success: true,
      data:
        "Password reset email has been sent to you. Please follow the steps from there to continue the password reset.",
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error("Email could not be sent");
  }
});

// @desc      Reset password
// @route     POST /api/v1/resetpassword/:resettoken
// @access    Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.password) {
    res.status(400);
    throw new Error("New password is required");
  }

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    console.log(`Invalid token ${resetPasswordToken}`);
    res.status(400);
    throw new Error("Invalid token");
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model and send response
const sendTokenResponse = async (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  const refreshToken = user.generateRefreshToken();

  // save refreshtoken
  await RefreshToken.create({ refreshToken });

  res.status(statusCode).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
      refreshToken,
    },
  });
};
