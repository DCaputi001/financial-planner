/**
 * @file User.js
 * @description Mongoose schema for storing user accounts,
 * including hashed passwords, BASE32 TOTP secrets,
 * and optional last-issued MFA codes.
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    /**
     * BASE32 TOTP Secret
     * Used for generating/validating MFA codes
     * Example: "JBSWY3DPEHPK3PXP"
     */
    totpSecret: {
      type: String,
      required: true
    },

    /**
     * Optional:
     * Stores the last generated TOTP code during login
     * Helpful for debugging or alternative MFA flows
     */
    lastIssuedCode: {
      type: String,
      default: null
    }
  },

  {
    timestamps: true // automatically adds createdAt, updatedAt
  }
);

export default mongoose.model('User', userSchema);