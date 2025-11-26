/**
 * @file goal-calculator.component.ts
 * @description
 * Angular component responsible for collecting user savings goal inputs
 * (goal amount, years, and annual interest rate), validating them, and
 * sending a request to the backend optimization API. The backend returns
 * the required monthly deposit and a projection table showing balance growth.
 *
 * This component now includes:
 *  - Input validation.
 *  - Binary search optimization request.
 *  - Displaying required deposit and projection output.
 *  - A "Save Goal" feature that sends completed goal data to the backend
 *    database API for persistent storage.
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GoalService } from '../services/goal.service';

/**
 * Represents the request payload sent to the optimizer backend.
 */
interface GoalRequest {
  goalAmount: number;
  months: number;
  annualRate: number;
}

/**
 * Represents a single projection row returned by the backend.
 */
interface ProjectionEntry {
  month: number;
  balance: number;
}

/**
 * Represents the structure of the backend response from the optimizer.
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
   * Input fields bound to the goal calculator form.
   */
  goalAmount = 0;
  years = 1;
  annualRate = 0;

  /**
   * UI state flags.
   */
  loading = false;

  /**
   * Outputs returned from backend optimizer.
   */
  requiredDeposit: string | null = null;
  projection: ProjectionEntry[] = [];

  /**
   * API endpoint for performing the optimization.
   */
  private apiUrl = `${environment.apiUrl}/api/goals/required-deposit`;

  constructor(
    private http: HttpClient,
    private goalService: GoalService
  ) {}

  /**
   * Validates form inputs to ensure numeric and safe values.
   *
   * @returns string | null - Returns an error message, or null if valid.
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
   * Handles click of the "Calculate" button.
   * Constructs request payload, calls optimization API,
   * and assigns backend results to component state.
   */
  onCalculate(): void {
    const error = this.validateInputs();
    if (error) {
      alert(error);
      return;
    }

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

  /**
   * Persists the completed savings goal to the database.
   * Requires that a successful calculation has been performed.
   */
  saveGoal(): void {
    if (!this.requiredDeposit || this.projection.length === 0) {
      alert('Please calculate the required deposit before saving.');
      return;
    }

    const payload = {
      goalAmount: this.goalAmount,
      years: this.years,
      annualRate: this.annualRate,
      requiredDeposit: Number(this.requiredDeposit),
      projection: this.projection
    };

    this.goalService.saveGoal(payload).subscribe({
      next: () => {
        alert('Goal saved successfully.');
      },
      error: (err) => {
        console.error('Error saving goal:', err);
        alert('An error occurred while saving the goal.');
      }
    });
  }
}