/**
 * SessionService
 * -----------------------------------------------------------
 * This service manages the user's authentication session on the
 * client side. It provides methods to store, retrieve, and clear
 * session-related data in localStorage.
 *
 * Responsibilities:
 * - Persist the authentication token for route guards and services.
 * - Store the authenticated user's email for display or personalization.
 * - Allow other components and guards to determine if a user is logged in.
 *
 * Security Notes:
 * - Tokens stored in localStorage are vulnerable to XSS attacks.
 *   This implementation is acceptable for educational and prototype
 *   purposes, but production applications should use HttpOnly cookies
 *   and server-side session handling for stronger security.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**
   * Key used to store the authentication token in localStorage.
   */
  private readonly TOKEN_KEY = 'authToken';

  /**
   * Key used to store the authenticated user's email in localStorage.
   */
  private readonly EMAIL_KEY = 'authEmail';

  /**
   * Stores the authentication token and associated email.
   *
   * @param token - A string that represents the user's session token.
   * @param email - The email address of the authenticated user.
   */
  setSession(token: string, email: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  /**
   * Clears all authentication-related values from localStorage.
   * Typically called during logout or session expiration.
   */
  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
  }

  /**
   * Determines whether a user is currently logged in.
   *
   * @returns true if a token exists, otherwise false.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Retrieves the stored email of the authenticated user.
   *
   * @returns The email string if present, or null if not.
   */
  getEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }
}