import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import RefreshToken from "../models/refreshTokenModel.js";

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cooies.token;
  // }

  // Make sure token exists
  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    if (req.body.refreshToken) {
      console.log("Expired access token. Refresh token provided");
      const refreshToken = req.body.refreshToken;
      const existingRefreshToken = await RefreshToken.findOne({
        refreshToken: refreshToken,
      });
      if (existingRefreshToken) {
        console.log("Refresh token valid... refreshing access token");
        jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_SECRET,
          async (err, userInfo) => {
            if (err) return res.sendStatus(403);

            const user = await User.findById(userInfo.id);
            const accessToken = user.getSignedJwtToken();
            user.token = accessToken;
            req.user = user;

            next();
          }
        );
      } else {
        res.status(401);
        console.log("Refresh token invalid");
        throw new Error("Not authorized to access this route");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized to access this route");
    }
  }
});

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `User role ${req.user.role} is not authorized to access this route`
      );
    }
    next();
  };
};
