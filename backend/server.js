import express from "express";
import dotenv from "dotenv";
import timerSet from "./data/timer_data.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/timers", (req, res) => {
  res.json(timerSet);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
