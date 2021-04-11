import { ReminderService } from './../services/reminder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  reminders$;

  constructor(private service: ReminderService) { }

  ngOnInit(): void {
    this.getReminders();
  }

  getReminders() {
    this.reminders$ = this.service.getReminders();

  }

}
