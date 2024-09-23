// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ FormsModule, NgIf ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // To display login errors if any

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response) {
        // Successfully logged in
        this.router.navigate(['/home']); // Navigate to home or another route
      } else {
        // Handle login failure (e.g., show an error message)
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}
