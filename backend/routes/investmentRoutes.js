/**
 * @file investmentRoutes.js
 * @description Defines all API endpoints related to investment operations.
 * These routes delegate processing to the Investment Controller.
 */

//
// Import dependencies
//
import express from 'express';
import { calculateInvestment } from '../controllers/investmentController.js';

//
// Initialize Express Router
//
const router = express.Router();

/**
 * @route POST /api/investments
 * @description Calculates compound interest projection based on user input.
 * @access Public
 *
 * Example Request Body:
 * {
 *   "initialAmount": 1000,
 *   "monthlyDeposit": 100,
 *   "annualRate": 5,
 *   "years": 10
 * }
 *
 * Example Response:
 * {
 *   "finalBalance": "15529.13",
 *   "totalInterest": "3529.13"
 * }
 */
router.post('/', calculateInvestment);

//
// Export the router for use in server.js
//
export default router;