/**
 * @file goalDatabaseRoutes.js
 * @description Routes for saving and retrieving user savings goals.
 */

import express from 'express';
import { createGoal, getGoals, deleteGoal } from '../controllers/goalDatabaseController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Save a goal
router.post('/', verifyToken, createGoal);

// Retrieve all goals for logged-in user
router.get('/', verifyToken, getGoals);

// Delete a goal by ID
router.delete('/:id', verifyToken, deleteGoal);

export default router;