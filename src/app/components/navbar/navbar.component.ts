import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dropdownVisible = false;
  notificationsVisible = false;
  friendsVisible = false; // State variable for friends dropdown
  notifications: string[] = ['Notification 1', 'Notification 2', 'Notification 3']; 
  friendsList: string[] = ['Friend 1', 'Friend 2', 'Friend 3']; // Example friend list

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout(); // Implement this method in your AuthService
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
    this.notificationsVisible = false;
    this.friendsVisible = false;
  }

  toggleNotifications(): void {
    this.notificationsVisible = !this.notificationsVisible;
    this.dropdownVisible = false;
    this.friendsVisible = false;
  }

  toggleFriends(): void { // New method to toggle friends dropdown
    this.friendsVisible = !this.friendsVisible;
    this.dropdownVisible = false;
    this.notificationsVisible = false;
  }

  // Listen for clicks on the entire document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if the click was outside any of the dropdowns
    if (!target.closest('.user-profile') && !target.closest('.notification-container') && !target.closest('.friends-container')) {
      this.closeAllDropdowns();
    }
  }

  closeAllDropdowns(): void { // Close all dropdowns
    this.dropdownVisible = false;
    this.notificationsVisible = false;
    this.friendsVisible = false;
  }
}
