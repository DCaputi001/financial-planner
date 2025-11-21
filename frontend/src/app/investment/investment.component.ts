import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvestmentService } from '../services/investment.service';

/**
 * InvestmentComponent
 *
 * This component provides a user interface for calculating investment growth
 * using compound interest. It handles user inputs, validates data, submits
 * the request to the backend API, and displays the results to the user.
 *
 * Responsibilities:
 * - Collect form input values
 * - Validate inputs for correctness and security
 * - Call the InvestmentService to send data to the backend
 * - Display calculated investment results
 */
@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent {

  /**
   * Form input fields bound to the template via ngModel.
   * These default values ensure that all fields have defined types.
   */
  initialAmount = 0;
  monthlyDeposit = 0;
  annualRate = 0;
  years = 1;

  /**
   * Results returned from the backend after calculation.
   * These are displayed only after a successful response.
   */
  finalBalance: string | null = null;
  totalInterest: string | null = null;

  /**
   * Controls visibility of the "Calculating..." message.
   */
  loading = false;

  constructor(private investmentService: InvestmentService) {}

  /**
   * validateInputs
   *
   * Validates all form inputs before sending the calculation request.
   * Ensures values are not null, not undefined, numeric, and non-negative.
   * Also enforces reasonable upper limits for years and interest rate.
   *
   * @returns A validation error message, or null if all fields are valid.
   */
  validateInputs(): string | null {
    // Ensure required fields exist
    if (
      this.initialAmount === null || this.initialAmount === undefined ||
      this.monthlyDeposit === null || this.monthlyDeposit === undefined ||
      this.annualRate === null || this.annualRate === undefined ||
      this.years === null || this.years === undefined
    ) {
      return 'All fields are required.';
    }

    // Ensure numeric validity
    if (
      isNaN(Number(this.initialAmount)) ||
      isNaN(Number(this.monthlyDeposit)) ||
      isNaN(Number(this.annualRate)) ||
      isNaN(Number(this.years))
    ) {
      return 'All fields must be valid numbers.';
    }

    // Ensure non-negative amounts
    if (
      Number(this.initialAmount) < 0 ||
      Number(this.monthlyDeposit) < 0 ||
      Number(this.annualRate) < 0 ||
      Number(this.years) <= 0
    ) {
      return 'Values cannot be negative, and years must be greater than zero.';
    }

    // Prevent unrealistic APR
    if (Number(this.annualRate) > 100) {
      return 'Interest rate cannot exceed 100%. Please enter a realistic APR.';
    }

    // Prevent unrealistic investment duration
    if (Number(this.years) > 100) {
      return 'Years cannot exceed 100. Please enter a reasonable investment duration.';
    }

    return null;
  }

  /**
   * onCalculate
   *
   * Handles the Calculate button click.
   * - Validates inputs
   * - Displays error messages where appropriate
   * - Sends sanitized payload to the backend
   * - Processes and displays returned results
   */
  onCalculate() {
    // Run validation logic
    const error = this.validateInputs();
    if (error) {
      alert(error);
      return;
    }

    // Start loading state and clear previous results
    this.loading = true;
    this.finalBalance = null;
    this.totalInterest = null;

    // Prepare sanitized numeric payload
    const payload = {
      initialAmount: Number(this.initialAmount),
      monthlyDeposit: Number(this.monthlyDeposit),
      annualRate: Number(this.annualRate),
      years: Number(this.years)
    };

    console.log('Payload being sent:', payload);

    // Send request to backend API
    this.investmentService.calculateInvestment(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.finalBalance = res.finalBalance;
        this.totalInterest = res.totalInterest;
        console.log('Backend response:', res);
      },
      error: (err) => {
        this.loading = false;
        console.error('API Error:', err);
        alert('A server error occurred. Please check your inputs or try again.');
      }
    });
  }
}