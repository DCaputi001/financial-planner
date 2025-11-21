/**
 * @file authController.js
 * @description Handles user registration, login, and multi-factor authentication (MFA)
 * using secure password hashing and a BASE32 TOTP implementation.
 */

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import base32 from 'thirty-two';

import User from '../models/User.js';
import { generateTOTP } from '../utils/totp.js';
import { checkRateLimit } from '../utils/rateLimiter.js';

/**
 * Registers a new user, storing a hashed password and BASE32 TOTP secret.
 *
 * Expected Request Body:
 *  - email: string
 *  - password: string
 */
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 12);

    // Generate a secure 20-byte TOTP secret
    const rawSecret = crypto.randomBytes(20);

    // Convert secret to BASE32 (required for TOTP standards)
    const totpSecret = base32.encode(rawSecret).toString().replace(/=/g, '');

    // Create and save new user
    const user = new User({
      email,
      passwordHash,
      totpSecret
    });

    await user.save();

    return res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


/**
 * Logs in a user, validates the password, and issues a TOTP MFA code.
 *
 * Expected Request Body:
 *  - email: string
 *  - password: string
 *
 * Response:
 *  - message
 *  - email
 *  - code (for demonstration; would be emailed/SMS in production)
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Apply simple rate limiting for security
    if (!checkRateLimit(email)) {
      return res.status(429).json({ error: "Too many login attempts. Try again later." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Validate password hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate the TOTP code using the BASE32 secret
    const code = generateTOTP(user.totpSecret);

    // Save last issued code (optional for demo purposes)
    user.lastIssuedCode = code;
    await user.save();

    return res.status(200).json({
      message: "Verification code sent",
      email,
      code  // In production, this would be delivered via email/SMS
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


/**
 * Verifies a TOTP code submitted by the user during MFA.
 *
 * Expected Request Body:
 *  - email: string
 *  - code: string (6-digit TOTP)
 */
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid user" });

    // Calculate the expected TOTP based on stored secret
    const expected = generateTOTP(user.totpSecret);

    if (code !== expected) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    // MFA success — client may now create a login session
    return res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};