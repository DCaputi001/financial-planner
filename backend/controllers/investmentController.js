/**
 * @file investmentController.js
 * @description Controller responsible for performing financial calculations
 * and generating compound interest projections based on user input. This module
 * validates incoming data, processes monthly compounding with contributions,
 * and returns structured JSON results for use by the frontend application.
 */

/**
 * @function calculateInvestment
 * @description Handles POST requests to calculate investment growth using
 * monthly compounding interest. Validates inputs, sanitizes values, performs
 * the calculation loop, and returns final balance and interest earned.
 *
 * @param {Object} req - Express request object containing investment data.
 * @param {Object} req.body.initialAmount - Starting principal amount.
 * @param {Object} req.body.monthlyDeposit - Monthly contribution amount.
 * @param {Object} req.body.annualRate - Annual interest rate (percentage).
 * @param {Object} req.body.years - Number of years to compound.
 *
 * @param {Object} res - Express response object used to return results.
 *
 * @returns {Object} JSON response containing:
 * - finalBalance {string}: The projected balance after compounding.
 * - totalInterest {string}: Total interest earned during the investment period.
 * - message {string}: Success message.
 */
export const calculateInvestment = (req, res) => {
  try {
    const { initialAmount, monthlyDeposit, annualRate, years } = req.body;

    /**
     * Input Validation
     *
     * Ensures required fields are present, numeric, and within allowable ranges.
     * This validation prevents malformed data and supports secure API behavior.
     */

    // Required fields check
    if (
      initialAmount === undefined ||
      annualRate === undefined ||
      years === undefined
    ) {
      return res.status(400).json({
        error: 'Missing required fields: initialAmount, annualRate, and years are mandatory.'
      });
    }

    // Convert to numeric types for validation and processing
    const initial = Number(initialAmount);
    const monthly = Number(monthlyDeposit ?? 0);
    const rate = Number(annualRate);
    const durationYears = Number(years);

    // Validate numeric correctness
    if (
      isNaN(initial) ||
      isNaN(monthly) ||
      isNaN(rate) ||
      isNaN(durationYears)
    ) {
      return res.status(400).json({
        error: 'All fields must be valid numeric values.'
      });
    }

    // Business logic constraints
    if (initial < 0 || monthly < 0 || rate < 0 || durationYears <= 0) {
      return res.status(400).json({
        error: 'Values must be non-negative, and years must be greater than zero.'
      });
    }

    if (rate > 100) {
      return res.status(400).json({
        error: 'Interest rate cannot exceed 100%. Please enter a realistic APR.'
      });
    }

    if (durationYears > 100) {
      return res.status(400).json({
        error: 'Years cannot exceed 100. Please enter a reasonable investment duration.'
      });
    }

    /**
     * Compound Interest Calculation Setup
     */

    const PERCENT_CONVERSION = 100;
    const MONTHS_IN_YEAR = 12;

    // Convert annual interest rate to a monthly rate
    const monthlyRate = rate / PERCENT_CONVERSION / MONTHS_IN_YEAR;

    // Total months in the investment period
    const totalMonths = durationYears * MONTHS_IN_YEAR;

    // Initialize running balance
    let total = initial;

    /**
     * Monthly Compound Interest Simulation
     *
     * Applies monthly contributions followed by interest compounding.
     */
    for (let i = 0; i < totalMonths; i++) {
      total += monthly;                 // Monthly deposit
      total += total * monthlyRate;     // Monthly interest
    }

    /**
     * Final Calculations
     */
    const totalContributions = initial + (monthly * totalMonths);
    const totalInterest = total - totalContributions;

    /**
     * Successful Response
     */
    return res.status(200).json({
      finalBalance: total.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      message: 'Investment projection calculated successfully.'
    });

  } catch (error) {
    /**
     * Global Error Handling
     * Captures unexpected runtime problems and prevents server crashes.
     */
    console.error('Error in calculateInvestment:', error.message);

    return res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
};