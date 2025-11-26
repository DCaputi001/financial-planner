/**
 * @file verifyToken.js
 * @description Legacy authentication parser used before JWT was introduced.
 * It extracts the "token|email" pair from the Authorization header and
 * attaches the email to req.userId for backward compatibility.
 *
 * This file keeps older parts of the app working until all services
 * fully transition to JWT-based authentication.
 */

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    // Expected format:  "Bearer token|email"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid Authorization format" });
    }

    // Extract "token|email"
    const [token, email] = parts[1].split("|");

    if (!email) {
      return res.status(401).json({ error: "Invalid Authorization header" });
    }

    // No JWT verification here — this middleware exists only
    // to maintain compatibility with the original system.
    req.userId = email;

    next();
  } catch (error) {
    console.error("verifyToken Error:", error);
    return res.status(500).json({ error: "Server error parsing token" });
  }
};