import { ReminderService } from './../services/reminder.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  @ViewChild('trash') inputBox: ElementRef;
  reminders$;

  constructor(private service: ReminderService, private router: Router,
     private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.getReminders();
  }

  getReminders() {
    this.reminders$ = this.service.getReminders();

  }

  createNew(){
    this.router.navigate(['reminders/new']);
  }

  delete(reminder, e){
    if(confirm("Are you sure to delete "+reminder.title)) {
      this.service.deleteReminder(reminder._id).subscribe(res=>{
        console.log(res);
        this.openSnackBar(res);

      });


    }
    e.stopImmediatePropagation();
    e.preventDefault();

  }

  openSnackBar(obj: any) {
    this._snackBar.open(obj.message, 'Hide', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    setTimeout(()=>this.getReminders(), 1000)
  }


}
