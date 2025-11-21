/**
 * VerifyComponent
 * -----------------------------------------------------------
 * This component handles the multi-factor authentication (MFA)
 * verification step required after a user successfully logs in.
 * The backend sends a verification code to the user’s email, and
 * the user must supply that code to complete authentication.
 *
 * Responsibilities:
 * - Capture and bind the verification code entered by the user.
 * - Retrieve the pending email value stored temporarily during login.
 * - Call AuthService.verifyCode() to validate the MFA token.
 * - On success, initialize an authenticated session and navigate
 *   the user to the protected application area.
 * - On failure, display a clear error message without exposing
 *   sensitive details.
 *
 * Angular Features Used:
 * - Standalone component architecture
 * - Two-way binding with FormsModule
 * - Observable subscription for HTTP requests
 * - Router navigation for post-verification redirection
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  /**
   * Stores the verification code entered by the user.
   * This should match the MFA code sent by the backend.
   */
  code = '';

  /**
   * Used to display error feedback or status messages to the user.
   */
  message = '';

  /**
   * Indicates whether the verification request is currently in progress.
   */
  loading = false;

  /**
   * The email address associated with the login attempt.
   * Retrieved from localStorage, where it was temporarily stored
   * during the initial login request.
   */
  email = localStorage.getItem('pendingEmail') || '';

  /**
   * Injects:
   * - AuthService: for verifying the MFA code.
   * - Router: for redirecting after successful verification.
   * - SessionService: for storing authenticated session data.
   */
  constructor(
    private auth: AuthService,
    private router: Router,
    private session: SessionService
  ) {}

  /**
   * onVerify()
   * -----------------------------------------------------------
   * Sends the verification code and associated email to the backend
   * for validation. If the code is correct, the user is granted
   * access to the protected application and session data is created.
   *
   * Success:
   * - Saves a valid session via SessionService.
   * - Clears MFA temporary data from localStorage.
   * - Redirects the user to the protected investment dashboard.
   *
   * Failure:
   * - Displays a clear, generic error message without leaking
   *   internal system details.
   */
  onVerify() {
    this.loading = true;

    this.auth.verifyCode(this.email, this.code).subscribe({
      next: () => {
        // Mark the session as authenticated
        this.session.setSession('VALID', this.email);

        // Remove temporary MFA values
        localStorage.removeItem('pendingEmail');
        localStorage.removeItem('pendingCode');

        this.loading = false;

        // Navigate to the secured area of the app
        this.router.navigate(['/investment']);
      },
      error: () => {
        this.message = 'Invalid verification code.';
        this.loading = false;
      }
    });
  }
}