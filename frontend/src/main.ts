/**
 * @file main.ts
 * @description
 * Bootstraps the Angular Financial Planner application using
 * Angular's standalone application API. This file serves as
 * the entry point for Angular's runtime and initializes the
 * root AppComponent along with global application configuration.
 *
 * Key Responsibilities:
 *  - Start the Angular application
 *  - Apply the global providers defined in app.config.ts
 *  - Handle any bootstrap errors during initialization
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

/**
 * bootstrapApplication()
 * ------------------------------------------------------------
 * Initializes the Angular application with:
 *  - The root AppComponent
 *  - All providers defined in the shared application config
 *
 * This replaces the older Angular pattern of using AppModule
 * and is part of Angular’s modern standalone architecture.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));   // Log bootstrap errors for debugging