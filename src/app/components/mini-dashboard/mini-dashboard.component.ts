import { Component } from '@angular/core';
import { MyGiftyComponent } from '../my-gifty/my-gifty.component';
import { FriendsComponent } from '../friends/friends.component';
import { StoresComponent } from '../stores/stores.component';
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-mini-dashboard',
  standalone: true,
  imports: [MyGiftyComponent, FriendsComponent, StoresComponent, CalendarComponent],
  templateUrl: './mini-dashboard.component.html',
  styleUrl: './mini-dashboard.component.css'
})
export class MiniDashboardComponent {

}
