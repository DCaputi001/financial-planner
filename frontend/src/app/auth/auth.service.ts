/**
 * AuthService
 * Handles all authentication API requests including:
 * - user registration
 * - login
 * - TOTP verification
 * - session management
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify`, { email, code });
  }
}