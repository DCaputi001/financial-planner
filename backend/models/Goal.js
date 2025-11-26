/**
 * @file Goal.js
 * @description Mongoose model for saved financial goals.
 * IMPORTANT: userId is stored as STRING (email), not ObjectId.
 */

import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    // Store the user's email as identifier
    userId: {
      type: String,
      required: true
    },

    goalAmount: {
      type: Number,
      required: true
    },

    years: {
      type: Number,
      required: true
    },

    annualRate: {
      type: Number,
      required: true
    },

    requiredDeposit: {
      type: Number,
      required: true
    },

    projection: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Goal", GoalSchema);