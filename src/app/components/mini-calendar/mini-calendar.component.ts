import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  standalone: true,
  imports: [MatDatepickerModule],
  styleUrls: ['./mini-calendar.component.css'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCalendarComponent {

  selected = model<Date | null>(null);

  friendsBirthdays = [
    new Date(2024, 9, 10),  // October 10, 2024
    new Date(2024, 9, 25),  // October 25, 2024
  ];

  dateClass = (date: Date) => {
    const formattedDate = this.formatDate(date);
    return this.friendsBirthdays.some(birthday => this.formatDate(birthday) === formattedDate) ? 'birthday-date' : '';
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
