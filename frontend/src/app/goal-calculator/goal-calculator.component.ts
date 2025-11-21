/**
 * @file goal-calculator.component.ts
 * @description
 * Angular component responsible for collecting savings goal inputs
 * (goal amount, number of years, and annual interest rate) and
 * sending an optimization request to the backend API. The backend
 * returns the required monthly deposit as well as an optional
 * projection table showing month-by-month balance growth.
 *
 * This component:
 *  - Validates user input for safe numeric values.
 *  - Constructs and sends a POST request to the financial optimizer API.
 *  - Displays a loading state while computation is in progress.
 *  - Renders the required monthly deposit and projection results.
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Shape of the request body sent to the backend.
 */
interface GoalRequest {
  goalAmount: number;
  months: number;
  annualRate: number;
}

/**
 * Represents one row in the projection dataset.
 * Each entry contains the month number and projected balance.
 */
interface ProjectionEntry {
  month: number;
  balance: number;
}

/**
 * Represents the structure of the backend response for a goal request.
 */
interface GoalResponse {
  requiredDeposit: string;
  projection: ProjectionEntry[];
  iterations: number;
  message: string;
}

@Component({
  selector: 'app-goal-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goal-calculator.component.html',
  styleUrls: ['./goal-calculator.component.css']
})
export class GoalCalculatorComponent {

  /**
   * Input fields bound to template form controls.
   */
  goalAmount = 0;
  years = 1;
  annualRate = 0;

  /**
   * UI state indicators.
   */
  loading = false;

  /**
   * Outputs returned from backend API.
   */
  requiredDeposit: string | null = null;
  projection: ProjectionEntry[] = [];

  /**
   * API endpoint derived from environment configuration.
   */
  private apiUrl = `${environment.apiUrl}/api/goals/required-deposit`;

  constructor(private http: HttpClient) {}

  /**
   * Validates user input before making an API request.
   * Ensures all fields are present, numeric, and within acceptable ranges.
   *
   * @returns string | null - Returns an error message if validation fails,
   *                          or null if all inputs are valid.
   */
  validateInputs(): string | null {
    if (
      this.goalAmount === undefined ||
      this.years === undefined ||
      this.annualRate === undefined
    ) {
      return 'All fields are required.';
    }

    if (
      isNaN(Number(this.goalAmount)) ||
      isNaN(Number(this.years)) ||
      isNaN(Number(this.annualRate))
    ) {
      return 'All fields must be valid numeric values.';
    }

    if (this.goalAmount <= 0 || this.years <= 0 || this.annualRate < 0) {
      return 'Values must be positive, and interest rate must be non-negative.';
    }

    if (this.annualRate > 100) {
      return 'Interest rate cannot exceed 100%.';
    }

    if (this.years > 100) {
      return 'Years cannot exceed 100.';
    }

    return null;
  }

  /**
   * Handles the "Calculate" action from the UI.
   * Performs validation, constructs the API request payload,
   * sends it to the backend optimizer, and handles success/error responses.
   */
  onCalculate(): void {
    const error = this.validateInputs();
    if (error) {
      alert(error);
      return;
    }

    // Reset state for a new calculation
    this.loading = true;
    this.requiredDeposit = null;
    this.projection = [];

    const payload: GoalRequest = {
      goalAmount: Number(this.goalAmount),
      months: Number(this.years) * 12,
      annualRate: Number(this.annualRate)
    };

    this.http.post<GoalResponse>(this.apiUrl, payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.requiredDeposit = res.requiredDeposit;
        this.projection = res.projection;
      },
      error: (err) => {
        this.loading = false;
        console.error('Goal optimization API error:', err);
        alert('A server error occurred. Please try again later.');
      }
    });
  }
}