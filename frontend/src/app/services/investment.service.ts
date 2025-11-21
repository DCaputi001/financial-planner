/**
 * @file investment.service.ts
 * @description Service responsible for communicating with the backend API
 * to perform compound interest and investment growth calculations.
 * This service handles all HTTP requests related to investment projections.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Interface defining the request payload structure for investment calculations.
 */
export interface InvestmentRequest {
  initialAmount: number;
  monthlyDeposit: number;
  annualRate: number;
  years: number;
}

/**
 * Interface defining the expected response structure from the backend API.
 */
export interface InvestmentResponse {
  finalBalance: string;
  totalInterest: string;
  message: string;
}

/**
 * InvestmentService
 *
 * This Angular service encapsulates API communication for investment-related
 * calculations. It provides a clean, reusable method for sending calculation
 * requests to the backend and receiving computed financial results.
 *
 * Responsibilities:
 * - Constructing HTTP POST requests to the backend API
 * - Defining type-safe request and response interfaces
 * - Ensuring clean separation between business logic and data transport
 */
@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  /**
   * Base API endpoint for investment-related backend operations.
   * The environment configuration allows portability across development,
   * testing, and production environments.
   */
  private readonly apiUrl = `${environment.apiUrl}/api/investments`;

  constructor(private http: HttpClient) {}

  /**
   * calculateInvestment
   *
   * Sends an investment projection request to the backend API.
   * Uses POST to securely transmit user input and retrieve
   * compound interest results.
   *
   * @param {InvestmentRequest} data - Object containing user-provided investment parameters.
   *
   * @returns {Observable<InvestmentResponse>}
   * An observable stream containing the backend's calculated results.
   *
   * Expected backend response:
   * {
   *   finalBalance: "15468.12",
   *   totalInterest: "3468.12",
   *   message: "Investment projection calculated successfully."
   * }
   */
  calculateInvestment(data: InvestmentRequest): Observable<InvestmentResponse> {
    return this.http.post<InvestmentResponse>(this.apiUrl, data);
  }
}