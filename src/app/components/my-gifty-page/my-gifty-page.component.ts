// my-gifty-page.component.ts
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RemindersComponent } from '../reminders/reminders.component';
import { MiniCalendarComponent } from '../mini-calendar/mini-calendar.component';
import { NgFor, NgIf, CommonModule, DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user.service';

interface Wishlist {
  name: string;
}

@Component({
  selector: 'app-my-gifty-page',
  standalone: true,
  imports: [FormsModule, RemindersComponent, MiniCalendarComponent, NgFor, NgIf],
  templateUrl: './my-gifty-page.component.html',
  styleUrls: ['./my-gifty-page.component.css']
})
export class MyGiftyPageComponent {
  wishlists: Wishlist[] = [
    { name: 'Birthday Party Ideas' },
    { name: 'Christmas Gifts' },
    { name: 'Travel Destinations' },
    { name: 'Books to Read' },
    { name: 'Home Decor' },
    { name: 'Tech Gadgets' },
  ];
  newWishlistName: string = '';
  maxWishlists: number = 8; // Maximum number of wishlists to show
  loggedInUserName: string | null = null; // Variable to hold the username

  constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService) {
    const localStorage = document.defaultView?.localStorage;
    const token = localStorage?.getItem('authToken'); // Retrieve the token from local storage
    if (token) {
      this.loggedInUserName = this.userService.getUsernameFromToken(token); // Extract username from the token
    }
    console.log('Logged in user:', this.loggedInUserName); // Debugging line to check value
  }

  // Function to add a new wishlist
  addWishlist() {
    if (this.newWishlistName.trim()) {
      this.wishlists.push({ name: this.newWishlistName });
      this.newWishlistName = ''; // Clear input field
    }
  }

  // Check if we can add a new wishlist (if there are less than max wishlists)
  canAddNewWishlist(): boolean {
    return this.wishlists.length < this.maxWishlists;
  }
}
