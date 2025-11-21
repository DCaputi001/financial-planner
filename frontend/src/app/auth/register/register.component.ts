/**
 * RegisterComponent
 * -----------------------------------------------------------
 * This component handles user account creation. It captures
 * registration inputs (email and password), sends them to the
 * backend through AuthService, and provides user feedback based
 * on the result.
 *
 * Responsibilities:
 * - Bind email and password fields to form inputs.
 * - Trigger user registration via AuthService.register().
 * - Display success or error messages dynamically.
 * - Redirect users to the login page after successful registration.
 *
 * Angular Features Used:
 * - Standalone component architecture
 * - Two-way data binding using FormsModule
 * - Router navigation
 * - Observable subscription pattern for asynchronous HTTP calls
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  /**
   * Stores the email entered by the user.
   * Bound to the registration form via ngModel.
   */
  email = '';

  /**
   * Stores the password entered by the user.
   * Bound to the registration form via ngModel.
   */
  password = '';

  /**
   * Holds user-facing feedback messages,
   * such as success notifications or error responses.
   */
  message = '';

  /**
   * Indicates whether the registration request is in progress.
   * Used to disable the button or show a loading state if needed.
   */
  loading = false;

  /**
   * Injects the authentication service and router.
   * - AuthService handles backend communication.
   * - Router controls navigation after registration.
   */
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   * onRegister()
   * -----------------------------------------------------------
   * Initiates the registration process. Sends email and password
   * to the AuthService, handles the observable response, and
   * provides appropriate feedback to the user.
   *
   * On Success:
   * - Displays a confirmation message.
   * - Waits 1 second before redirecting to the login page.
   *
   * On Error:
   * - Displays backend-provided error message if available.
   * - Falls back to a generic message otherwise.
   */
  onRegister() {
    this.loading = true;

    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.message = 'Registration successful. Redirecting to login...';
        this.loading = false;

        // Redirect the user shortly after successful registration.
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        // Attempt to surface a backend error message if present.
        this.message = err.error?.error || 'Registration failed.';
        this.loading = false;
      }
    });
  }
}