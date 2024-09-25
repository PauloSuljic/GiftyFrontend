import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  constructor(private router: Router) {}

  navigateToCalendar() {
    this.router.navigate(['/calendar']); // Redirect to My Gifty Page
  }
}
