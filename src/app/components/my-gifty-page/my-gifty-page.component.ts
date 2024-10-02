import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RemindersComponent } from '../reminders/reminders.component';
import { MiniCalendarComponent } from '../mini-calendar/mini-calendar.component';
import { NgFor, NgIf, CommonModule, DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user.service';
import { WishlistService } from '../../services/wishlist.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export interface Wishlist {
  id: string;
  title: string; // Changed from `name` to `title`
  items: any[];  // Assuming items will be an array; you can specify more detail if needed
}

interface NewWishlist {
  title: string; // Changed from `name` to `title`
  items: any[];  // Assuming items will be an array; you can specify more detail if needed
}

@Component({
  selector: 'app-my-gifty-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RemindersComponent, MiniCalendarComponent, NgFor, NgIf],
  templateUrl: './my-gifty-page.component.html',
  styleUrls: ['./my-gifty-page.component.css']
})
export class MyGiftyPageComponent {
  wishlists$: Observable<Wishlist[]> | undefined; // Observable for wishlists
  wishlists: Wishlist[] = []; // Local state for wishlists
  newWishlist: NewWishlist = { title: '', items: [] }; // Object for new wishlist
  maxWishlists: number = 8; // Maximum number of wishlists to show
  loggedInUserName: string | null = null; // Variable to hold the username

  constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService, private wishlistService: WishlistService, private router: Router) {
    const localStorage = document.defaultView?.localStorage;
    const token = localStorage?.getItem('authToken'); // Retrieve the token from local storage
    if (token) {
      this.loggedInUserName = this.userService.getUsernameFromToken(token); // Extract username from the token
    }
    console.log('Logged in user:', this.loggedInUserName); // Debugging line to check value
    this.loadWishlists();
  }

  // Load wishlists from the service
  loadWishlists() {
    this.wishlistService.getWishlists().subscribe({
      next: (wishlists) => {
        this.wishlists = wishlists;
      },
      error: (error) => console.error('Error fetching wishlists:', error)
    });
  }

  // Function to add a new wishlist
  addWishlist() {
    if (this.newWishlist.title.trim()) {
      this.wishlistService.addWishlist(this.newWishlist).subscribe({
        next: (newWishlist) => {
          console.log('Wishlist added successfully', newWishlist);
          this.loadWishlists(); // Refresh wishlists after adding a new one
          this.newWishlist = { title: '', items: [] }; // Clear the object after adding
        },
        error: (error) => {
          console.error('Error adding wishlist:', error);
        }
      });
    }
  }

  // Check if we can add a new wishlist (if there are less than max wishlists)
  canAddNewWishlist(): boolean {
    return this.wishlists.length < this.maxWishlists;
  }

  // Navigate to the wishlist detail page
  navigateToWishlist(wishlist: any) {
    this.router.navigate(['/wishlists', wishlist.id]);  // Pass the wishlist id in the URL
  }
}
