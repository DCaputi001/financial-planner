/**
 * LoginComponent
 * -----------------------------------------------------------
 * This component handles user authentication input and initiates
 * the login request via the AuthService. It captures user
 * credentials, triggers backend authentication, and redirects
 * the user to the verification page if MFA is required.
 *
 * Responsibilities:
 * - Bind UI inputs (email and password) to component properties.
 * - Call AuthService.login() and process the observable response.
 * - Display error messages to the user when necessary.
 * - Store temporary MFA values (email and verification code).
 * - Navigate to the /verify route upon successful login.
 *
 * Angular Features Used:
 * - Standalone components
 * - Two-way binding via FormsModule
 * - Router navigation
 * - Observable subscription handling
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Holds the email entered by the user.
   * Bound to the input field via ngModel.
   */
  email = '';

  /**
   * Holds the password entered by the user.
   * Bound to the input field via ngModel.
   */
  password = '';

  /**
   * Displays a feedback message to the user.
   * Used primarily for login error messages.
   */
  message = '';

  /**
   * Indicates whether a login request is currently in progress.
   * Prevents duplicate submissions and can be used for disabling UI buttons.
   */
  loading = false;

  /**
   * Inject required services:
   * - AuthService: Handles authentication logic.
   * - Router: Allows navigation on success.
   */
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * onLogin()
   * -----------------------------------------------------------
   * Triggered when the user submits the login form.
   * Sends the email and password to the AuthService and handles
   * success or failure responses.
   *
   * Success:
   * - Stores the user's email and MFA code in localStorage.
   * - Navigates to the /verify page for multi-factor verification.
   *
   * Error:
   * - Displays an appropriate error message.
   * - Resets loading state.
   */
  onLogin() {
    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        // Persist email and MFA code for the verification step
        localStorage.setItem('pendingEmail', this.email);
        localStorage.setItem('pendingCode', res.code);

        this.loading = false;

        // Redirect user to MFA verification page
        this.router.navigate(['/verify']);
      },
      error: () => {
        // Display user-friendly error message
        this.message = 'Invalid credentials.';
        this.loading = false;
      }
    });
  }

}