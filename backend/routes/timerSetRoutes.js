import express from "express";

import { getTimerSet } from "../controllers/timerSetController.js";

const router = express.Router();

router.route("/:key").get(getTimerSet);

export default router;
