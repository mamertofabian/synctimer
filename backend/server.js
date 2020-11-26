import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import colors from "colors";
import connectDB from "./config/db.js";

import timerSetRoutes from "./routes/timerSetRouter.js";

dotenv.config();

connectDB();

const app = express();
// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 10000,
});
app.use(limiter);

// Prevent http param polution
app.use(hpp());

// Enable CORS
// app.use(cors());

app.use("/api/v1/timerset", timerSetRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
