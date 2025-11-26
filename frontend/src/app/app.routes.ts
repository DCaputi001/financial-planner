/**
 * @file app.routes.ts
 * @description
 * Defines all application routes for the Financial Planner system.
 * This configuration uses Angular’s standalone component routing
 * pattern and applies route guards to ensure proper authentication flow.
 *
 * Key Concepts:
 * - NoAuthGuard: Prevents logged-in users from accessing login/register routes.
 * - AuthGuard: Protects restricted pages so only authenticated users may enter.
 * - Lazy loading of components via loadComponent for performance optimization.
 *
 * Route Categories:
 * 1. Public routes (login, register, verify)
 * 2. Protected routes (investment calculator, savings goal optimizer)
 */

import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';

export const routes: Routes = [

  /**
   * Default Route
   * ------------------------------------------------------------
   * Visiting the base URL ('/') redirects users to the login page.
   * pathMatch: 'full' ensures only an exact match triggers the redirect.
   */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  /**
   * Login Route
   * ------------------------------------------------------------
   * Uses NoAuthGuard to block access if user is already authenticated.
   * Lazy loads the LoginComponent.
   */
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },

  /**
   * Registration Route
   * ------------------------------------------------------------
   * Also blocked for authenticated users. Intended for new account creation.
   */
  {
    path: 'register',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./auth/register/register.component').then(m => m.RegisterComponent)
  },

  /**
   * MFA Verification Route
   * ------------------------------------------------------------
   * Accessible only when user is in the login/verification process.
   * NoAuthGuard prevents fully logged-in users from re-visiting this page.
   */
  {
    path: 'verify',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./auth/verify/verify.component').then(m => m.VerifyComponent)
  },

  /**
   * Investment Calculator Route
   * ------------------------------------------------------------
   * Protected via AuthGuard. Only authenticated users may access
   * the investment growth tool.
   */
  {
    path: 'investment',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./investment/investment.component').then(m => m.InvestmentComponent)
  },

  /**
   * Savings Goal Optimization Route
   * ------------------------------------------------------------
   * Also protected via AuthGuard to prevent unauthorized access
   * to financial tools and user-specific calculations.
   */
  {
    path: 'goal',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./goal-calculator/goal-calculator.component').then(m => m.GoalCalculatorComponent)
  },
  {
  path: 'saved-goals',
  loadComponent: () =>
    import('./saved-goals/saved-goals.component').then(m => m.SavedGoalsComponent)
  }

];