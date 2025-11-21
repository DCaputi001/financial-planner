/**
 * @file app.ts
 * @description
 * Root component of the Financial Planner application. This component:
 *  - Initializes a connection check to the backend server.
 *  - Exposes the SessionService to the template for authentication-aware UI.
 *  - Provides a logout handler that clears the session and redirects users.
 *
 * The component is implemented using Angular’s standalone component pattern,
 * removing the need for a traditional AppModule.
 */

import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { SessionService } from './auth/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {

  /**
   * Holds the backend connection status message displayed in the UI.
   * Default value shown until API response is received.
   */
  serverMessage = 'Connecting...';

  /**
   * Injects:
   * - HttpClient: for backend connectivity checks.
   * - SessionService: shared authentication state for navbar/UI.
   */
  constructor(
    private http: HttpClient,
    public session: SessionService
  ) {}

  /**
   * ngOnInit()
   * ------------------------------------------------------------
   * Lifecycle hook called once when the component is initialized.
   * Sends a lightweight GET request to the backend to verify its
   * availability and updates the UI with the response.
   *
   * If the backend is unreachable, a fallback message is displayed.
   */
  ngOnInit(): void {
    this.http.get(environment.apiUrl, { responseType: 'text' }).subscribe({
      next: (res) => (this.serverMessage = res),
      error: () => (this.serverMessage = 'Error connecting to backend.')
    });
  }

  /**
   * logout()
   * ------------------------------------------------------------
   * Clears the user's authenticated session and forces a hard redirect
   * to the login page. A full reload ensures all protected views and
   * cached component states are reset.
   *
   * SessionService.clearSession():
   *   - Removes token + email values from localStorage.
   *   - Allows navigation guards to properly restrict routes.
   */
  logout(): void {
    this.session.clearSession();
    window.location.href = '/login'; // Force hard route reload for cleanup
  }

}