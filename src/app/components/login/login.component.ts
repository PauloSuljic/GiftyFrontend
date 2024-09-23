import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgIf } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // To display login errors if any

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    // Create login payload
    const loginPayload = {
      email: this.email,
      password: this.password
    };

    // Send login request to the backend API
    this.http.post<{ token: string }>('http://localhost:5010/api/auth/login', loginPayload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 || error.status === 401) {
            // Invalid email/password case
            this.errorMessage = 'Invalid email or password.';
          } else {
            // Other error cases
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
          return of(null);  // Return a null observable so the pipe continues
        })
      )
      .subscribe((response: any) => {
        if (response && response.data) {
          console.log('Login successful! Token:', response.data);

          // Save the token (you might want to store it in localStorage or sessionStorage)
          localStorage.setItem('authToken', response.data);

          // Redirect to the dashboard
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Login failed');
        }
      });
  }
}
