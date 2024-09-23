// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5010/api/auth/login';
  private readonly tokenKey = 'authToken'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const loginPayload = { email, password };
    
    return this.http.post<{ data: string }>(this.apiUrl, loginPayload).pipe(
      tap(response => {
        if (response && response.data) {
          // Store the token in localStorage
          localStorage.setItem(this.tokenKey, response.data);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle the error accordingly
        console.error('Login error', error);
        return of(null); // Return null to indicate failure
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return this.isTokenValid(token);
  }

  private isTokenValid(token: string | null): boolean {
    if (!token) return false;

    // You can implement token validation logic here
    // For example, decode the token and check expiration
    const payload = this.decodeToken(token);
    if (!payload) return false;

    // Check if the token has expired (assuming the exp claim is a UNIX timestamp)
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // Get the payload part of the JWT
      return JSON.parse(atob(payload)); // Decode and parse the payload
    } catch (e) {
      return null; // If there's an error, return null
    }
  }


  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
