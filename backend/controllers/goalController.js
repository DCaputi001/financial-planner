/**
 * @file goalController.js
 * @description Contains algorithmic logic for savings goal optimization,
 * including a binary search algorithm to determine the minimum required
 * monthly deposit needed to reach a specified goal balance within a defined
 * timeframe and interest rate.
 */

export const calculateRequiredDeposit = (req, res) => {
  try {
    const { goalAmount, months, annualRate } = req.body;

    // Input validation
    if (
      goalAmount === undefined ||
      months === undefined ||
      annualRate === undefined
    ) {
      return res.status(400).json({
        error: "Missing required fields: goalAmount, months, and annualRate."
      });
    }

    const goal = Number(goalAmount);
    const totalMonths = Number(months);
    const rate = Number(annualRate);

    if (isNaN(goal) || isNaN(totalMonths) || isNaN(rate)) {
      return res.status(400).json({
        error: "All fields must be valid numbers."
      });
    }

    if (goal <= 0 || totalMonths <= 0 || rate < 0) {
      return res.status(400).json({
        error: "Values must be positive, and interest rate must be non-negative."
      });
    }

    // Convert annual rate to monthly rate
    const monthlyRate = rate / 100 / 12;

    /**
     * Helper function to simulate investment growth
     * using a given monthly deposit value.
     */
    const simulateInvestment = (deposit) => {
      let balance = 0;
      const projection = [];

      for (let i = 1; i <= totalMonths; i++) {
        balance += deposit;
        balance += balance * monthlyRate;

        projection.push({
          month: i,
          balance: Number(balance.toFixed(2))
        });
      }

      return { balance, projection };
    };

    /**
     * Binary Search Algorithm
     * Finds the smallest deposit that reaches or exceeds the goal amount.
     *
     * Time Complexity: O(log n)
     */
    let low = 0;
    let high = goal;
    let mid;
    let iterations = 0;
    let finalProjection = [];

    while (high - low > 0.01) {
      iterations++;
      mid = (low + high) / 2;
      const result = simulateInvestment(mid);

      if (result.balance < goal) {
        low = mid;
      } else {
        high = mid;
        finalProjection = result.projection;
      }
    }

    return res.status(200).json({
      requiredDeposit: mid.toFixed(2),
      projection: finalProjection,
      iterations,
      message: "Savings goal optimization completed successfully."
    });

  } catch (error) {
    console.error("Error in calculateRequiredDeposit:", error.message);
    return res.status(500).json({
      error: "Internal server error. Please try again later."
    });
  }
};