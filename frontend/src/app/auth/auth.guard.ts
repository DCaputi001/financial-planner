/**
 * AuthGuard
 * -----------------------------------------------------------
 * This route guard protects restricted application routes by
 * verifying whether the user has an active authenticated session.
 *
 * During navigation, Angular calls canActivate() to determine
 * whether the route may be accessed. If the user is authenticated,
 * navigation proceeds. Otherwise, the user is redirected to the
 * login page.
 *
 * Responsibilities:
 * - Query the SessionService to determine if a valid session exists.
 * - Prevent unauthorized access to protected routes.
 * - Redirect unauthenticated users to the login interface.
 *
 * Security Notes:
 * - Guards help enforce client-side access control but must always
 *   be backed by server-side validation for true security.
 * - This guard helps maintain proper user flow and improves UX by
 *   preventing access to screens that require authentication.
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Injects:
   * - SessionService: stores and checks the user's authenticated state.
   * - Router: used to redirect unauthenticated users to the login page.
   */
  constructor(
    private session: SessionService,
    private router: Router
  ) {}

  /**
   * canActivate()
   * -----------------------------------------------------------
   * Determines whether a user may access a protected route.
   *
   * Returns:
   *  - true if the user has a valid authenticated session.
   *  - false if not, and automatically redirects the user to /login.
   *
   * This method runs before Angular activates the route.
   */
  canActivate(): boolean {

    // If a valid session exists, allow navigation.
    if (this.session.isLoggedIn()) {
      return true;
    }

    // Otherwise redirect user to login and block route activation.
    this.router.navigate(['/login']);
    return false;
  }
}