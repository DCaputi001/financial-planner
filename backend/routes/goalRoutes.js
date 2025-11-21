import express from "express";
import { calculateRequiredDeposit } from "../controllers/goalController.js";

const router = express.Router();

// POST /api/goals/required-deposit
router.post("/required-deposit", calculateRequiredDeposit);

export default router;