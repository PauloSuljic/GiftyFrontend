import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'; // Service to get friends
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RemindersComponent } from '../reminders/reminders.component';
import { MiniCalendarComponent } from '../mini-calendar/mini-calendar.component';
import { Observable } from 'rxjs';

interface Friend {
  id: string;
  name: string;
  image: string; // Path to friend’s profile image
}

@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [RemindersComponent, MiniCalendarComponent, FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent {
  friends: Friend[] = []; // Initialize as an empty array
  searchQuery: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.loadFriends();
  }

  loadFriends() {
    this.userService.getFriends().subscribe({
      next: (friends: Friend[]) => {
          this.friends = friends;
      },
      error: (error) => {
          console.error("Error fetching friends:", error);
          // You might want to display a user-friendly message here.
      },
      complete: () => {
          console.log("Friends fetching completed");
      }
    });
  }

  // Filtered friends based on the search query
  filteredFriends(friends: Friend[]): Friend[] {
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Navigate to friend's profile
  navigateToFriend(friendId: string) {
    this.router.navigate(['/friend/', friendId]); // Navigates to friend profile page
  }
}
