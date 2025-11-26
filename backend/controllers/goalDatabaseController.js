/**
 * @file goalDatabaseController.js
 * @description
 * Handles saving, retrieving, and deleting savings goals from the database.
 * This file exists *separately* from goalController.js to avoid interfering
 * with existing algorithmic logic (binary search optimization).
 */

import Goal from '../models/Goal.js';

/* ============================================================================
   CREATE GOAL
   ============================================================================ */

/**
 * @function createGoal
 * @description Saves a completed savings goal into MongoDB.
 *
 * Expected Request Body:
 *  - goalAmount: number
 *  - years: number
 *  - annualRate: number
 *  - requiredDeposit: number | string
 *  - projection: array (optional)
 *
 * Only accessible to authenticated users. The userId is set by auth middleware.
 */
export const createGoal = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      goalAmount,
      years,
      annualRate,
      requiredDeposit,
      projection
    } = req.body;

    // Validate required fields
    if (
      goalAmount === undefined ||
      years === undefined ||
      annualRate === undefined ||
      requiredDeposit === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const goal = new Goal({
      userId,
      goalAmount,
      years,
      annualRate,
      requiredDeposit,
      projection
    });

    await goal.save();

    return res.status(201).json({
      message: "Goal saved successfully",
      goal
    });

  } catch (error) {
    console.error("Create Goal Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/* ============================================================================
   GET ALL GOALS
   ============================================================================ */

/**
 * @function getGoals
 * @description Fetches all saved goals for the authenticated user.
 */
export const getGoals = async (req, res) => {
  try {
    const userId = req.userId;

    const goals = await Goal.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(goals);

  } catch (error) {
    console.error("Get Goals Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/* ============================================================================
   DELETE GOAL
   ============================================================================ */

/**
 * @function deleteGoal
 * @description Deletes a single saved goal belonging to the authenticated user.
 */
export const deleteGoal = async (req, res) => {
  try {
    const userId = req.userId;
    const goalId = req.params.id;

    const goal = await Goal.findOne({ _id: goalId, userId });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found." });
    }

    await Goal.deleteOne({ _id: goalId });

    return res.status(200).json({ message: "Goal deleted successfully" });

  } catch (error) {
    console.error("Delete Goal Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};