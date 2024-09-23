import { NgFor } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [NgFor],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  friendsBirthdays = [
    { name: 'Alice', date: '2024-09-24' },
    { name: 'Bob', date: '2024-10-05' }
  ];
}
