/**
 * @file app.config.ts
 * @description
 * Defines the root application configuration for an Angular standalone
 * application. This configuration registers global providers such as the
 * application router and HttpClient, ensuring that core Angular features
 * are available throughout the app.
 *
 * Angular Features Used:
 * - ApplicationConfig: Provides bootstrap-level configuration.
 * - provideRouter(): Registers application routing definitions.
 * - provideHttpClient(): Enables HttpClient for API communication.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

/**
 * appConfig
 * -----------------------------------------------------------
 * The main configuration object used during application bootstrap.
 * It initializes:
 *
 *  - Routing: using Angular's standalone provideRouter() function.
 *  - HttpClient: enabling HTTP communication throughout the app.
 *
 * This centralized configuration replaces older module-based
 * approaches (such as AppModule) in Angular's standalone API model.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Registers all application routes
    provideRouter(routes),

    // Enables HttpClient and Http services across the application
    provideHttpClient()
  ]
};