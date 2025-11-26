/**
 * @file goal.service.ts
 * @description
 * Angular service for interacting with savings goal backend routes.
 * Handles saving, fetching, and deleting goals for authenticated users.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  /**
   * Correct base URL for ALL goal operations.
   * Note: There is NO "/db" path in the backend.
   */
  private apiUrl = `${environment.apiUrl}/api/goals`;

  constructor(private http: HttpClient) {}

  /**
   * Builds the Authorization header in the form:
   * Authorization: Bearer token|email
   */
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('authEmail');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}|${email}`
      })
    };
  }

  /**
   * Save a new goal to the database.
   * Backend route: POST /api/goals
   */
  saveGoal(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, this.getAuthHeaders());
  }

  /**
   * Fetch all goals for logged-in user.
   * Backend route: GET /api/goals
   */
  getGoals(): Observable<any> {
    return this.http.get(this.apiUrl, this.getAuthHeaders());
  }

  /**
   * Delete one saved goal.
   * Backend route: DELETE /api/goals/:id
   */
  deleteGoal(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}