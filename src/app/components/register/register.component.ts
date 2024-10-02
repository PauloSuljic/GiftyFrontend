import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  birthday: string = '';
  fullName: string = '';
  success: boolean = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(registerForm: NgForm) {
    // Check if the form is valid before proceeding
    if (registerForm.invalid) {
      this.error = 'Please fill out the form correctly before submitting.';
      return;
    }
    
    const formattedBirthday = new Date(this.birthday).toISOString(); // Converts to 'YYYY-MM-DDTHH:MM:SS'
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      birthday: formattedBirthday
    };

    this.authService.register(this.username, this.email, this.password, this.fullName, formattedBirthday).subscribe(
      response => {
        console.log("Registration successful:", response);
        this.success = true;
        this.error = null;
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error => {
        console.error("Registration failed:", error);
        this.error = 'Registration failed. Please try again.';
        this.success = false;
      }
    );
  }
}
