/**
 * @file authController.js
 * @description Handles registration, login, and MFA verification using
 * BASE32-encoded TOTP secrets. This version matches the working TOTP setup.
 */

import bcrypt from "bcryptjs";
import crypto from "crypto";
import base32 from "thirty-two";

import User from "../models/User.js";
import { generateTOTP } from "../utils/totp.js";
import { checkRateLimit } from "../utils/rateLimiter.js";


/**
 * Register a new user with:
 *  - email
 *  - bcrypt password hash
 *  - BASE32 TOTP secret
 */
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Generate 20 random bytes
    const rawSecret = crypto.randomBytes(20);

    // Convert to BASE32 (REQUIRED for your working TOTP setup)
    const totpSecret = base32.encode(rawSecret).toString().replace(/=/g, "");

    const user = new User({
      email,
      passwordHash,
      totpSecret
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


/**
 * Login handler
 * Generates a TOTP code based on the stored BASE32 secret.
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!checkRateLimit(email)) {
      return res.status(429).json({ error: "Too many login attempts" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const code = generateTOTP(user.totpSecret); // BASE32 secret works correctly

    user.lastIssuedCode = code;
    await user.save();

    return res.status(200).json({
      message: "Verification code sent",
      email,
      code // In production this is emailed, not returned.
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


/**
 * Verify the TOTP code
 */
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid user" });

    const expected = generateTOTP(user.totpSecret);

    if (String(code) !== String(expected)) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    return res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};