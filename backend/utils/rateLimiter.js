const loginAttempts = new Map(); // email -> queue of timestamps
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute

export function checkRateLimit(email) {
  const now = Date.now();

  if (!loginAttempts.has(email)) {
    loginAttempts.set(email, []);
  }

  const attempts = loginAttempts.get(email);

  // Remove timestamps older than 1 minute
  while (attempts.length > 0 && now - attempts[0] > WINDOW_MS) {
    attempts.shift();
  }

  if (attempts.length >= MAX_ATTEMPTS) {
    return false; // rate limit exceeded
  }

  attempts.push(now);
  return true;
}