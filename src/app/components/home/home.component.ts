import { Component } from '@angular/core';
import { MiniDashboardComponent } from '../mini-dashboard/mini-dashboard.component';
import { RemindersComponent } from '../reminders/reminders.component';
import { MiniCalendarComponent } from '../mini-calendar/mini-calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MiniDashboardComponent, RemindersComponent, MiniCalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
