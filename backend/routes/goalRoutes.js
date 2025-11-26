import express from "express";
import { calculateRequiredDeposit } from "../controllers/goalController.js";
import {
  createGoal,
  getGoals,
  deleteGoal
} from "../controllers/goalDatabaseController.js";

// IMPORTANT: use verifyToken — NOT authMiddleware
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Optimization algorithm route
router.post("/required-deposit", calculateRequiredDeposit);

// Database routes
router.post("/", verifyToken, createGoal);
router.get("/", verifyToken, getGoals);
router.delete("/:id", verifyToken, deleteGoal);
export default router;