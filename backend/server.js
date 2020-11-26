const express = require("express");
const timerSet = require("./data/timer_data");

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/timers", (req, res) => {
  res.json(timerSet);
});

app.listen(5000, console.log("Server running on port 5000"));
