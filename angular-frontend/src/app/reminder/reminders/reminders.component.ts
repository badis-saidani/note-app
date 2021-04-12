import { ReminderService } from './../services/reminder.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  reminders$;

  constructor(private service: ReminderService, private router: Router) { }

  ngOnInit(): void {
    console.log('inside remider compo');
    
    this.getReminders();
  }

  getReminders() {
    this.reminders$ = this.service.getReminders();

  }

  navigateTo(r){
    console.log(r);
    
    this.router.navigate(['reminders/'+r._id, {state:r}]);
  }

}
