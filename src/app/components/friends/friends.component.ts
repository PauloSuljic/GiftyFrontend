import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  constructor(private router: Router) {}
  navigateToFriends() {
    this.router.navigate(['/friends']); // Redirect to My Gifty Page
  }
}
