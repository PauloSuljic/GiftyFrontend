import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'authToken'; 
  private loginUrl = 'http://localhost:5010/api/auth/login';
  private registerUrl = 'http://localhost:5010/api/auth/register'; // Registration API URL

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object // Inject PLATFORM_ID
  ) {}

  // LOGIN LOGIC
  login(email: string, password: string) {
    const loginPayload = { email, password };
    
    return this.http.post<{ data: string }>(this.loginUrl, loginPayload).pipe(
      tap(response => {
        if (response && response.data && isPlatformBrowser(this.platformId)) {
          // Store the token in localStorage if running in the browser
          localStorage.setItem(this.tokenKey, response.data);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error', error);
        return of(null); // Return null to indicate failure
      })
    );
  }

  // REGISTRATION LOGIC
  register(username: string, email: string, password: string, fullName: string, birthday: string) {
    const registerPayload = { username, email, password, fullName, birthday };

    return this.http.post(this.registerUrl, registerPayload).pipe(
      tap(response => {
        console.log('Registration successful', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Registration error', error);
        return of(null); // Return null to indicate failure
      })
    );
  }

  // AUTHENTICATION CHECK
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.tokenKey);
      return this.isTokenValid(token);
    }
    return false;
  }

  // TOKEN VALIDATION LOGIC
  private isTokenValid(token: string | null): boolean {
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload) return false;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  // LOGOUT LOGIC
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.router.navigate(['/login']);
    }
  }
}
