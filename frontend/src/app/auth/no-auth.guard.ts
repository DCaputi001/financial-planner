/**
 * NoAuthGuard
 * -----------------------------------------------------------
 * This guard prevents authenticated users from accessing routes
 * intended only for unauthenticated visitors, such as the
 * login or registration pages.
 *
 * Purpose:
 * - Improve user experience by preventing logged-in users from
 *   seeing pages they no longer need (e.g., login screen).
 * - Enforce cleaner navigation flow and avoid unnecessary access
 *   to public-facing authentication routes.
 *
 * Behavior:
 * - If the user *is logged in*, block activation and redirect them
 *   to the main authenticated area (/investment).
 * - If the user *is not logged in*, allow route access.
 *
 * Notes:
 * - This guard complements AuthGuard by handling the opposite case.
 * - Client-side guards provide usability flow control, not security.
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  /**
   * Injects:
   * - SessionService: used to determine authentication state.
   * - Router: used for redirecting authenticated users.
   */
  constructor(
    private session: SessionService,
    private router: Router
  ) {}

  /**
   * canActivate()
   * -----------------------------------------------------------
   * Prevents logged-in users from accessing public-only pages.
   *
   * Returns:
   *  - false if the user is authenticated (and redirects them to /investment).
   *  - true if not authenticated (allowing access to login/register pages).
   */
  canActivate(): boolean {

    // If user already has a valid session, redirect them to the authenticated section.
    if (this.session.isLoggedIn()) {
      this.router.navigate(['/investment']);
      return false;
    }

    // User is unauthenticated, allow access.
    return true;
  }
}