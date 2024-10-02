import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-gifty',
  standalone: true,
  imports: [],
  templateUrl: './my-gifty.component.html',
  styleUrl: './my-gifty.component.css'
})
export class MyGiftyComponent {
  constructor(private router: Router) {}
  navigateToMyGifty() {
    this.router.navigate(['/my-gifty']); // Redirect to My Gifty Page
  }
}
