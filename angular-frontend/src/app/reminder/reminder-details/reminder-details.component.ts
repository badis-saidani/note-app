import { ReminderService } from './../services/reminder.service';
import { StorageService } from './../../storage.service';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.css']
})
export class ReminderDetailsComponent implements OnInit {

  setTime;
  reminder;
  option: 'new' | 'update';
  reminderForm: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private router: Router, private service: ReminderService,
     private fb: FormBuilder, private _snackBar: MatSnackBar) {

    this.reminder = this.router.getCurrentNavigation().extras.state;
    this.option = (this.reminder)?'update':'new'
    console.log(this.reminder);


  }

  ngOnInit(): void {
    console.log('in details');
    if(!this.reminder){
      this.reminder = {
        title: '',
        set_at: Date.now(),
        content : '',
        created_at: Date.now(),
        updated_at: Date.now()
      }

    }

    this.setTime = this.reminder.set_at;
    this.reminderForm = this.fb.group({
      title: [this.reminder.title, Validators.required],
      content: this.reminder?.content
    });
  }

  submit(){
    const rem = {
      // _id: this.reminder._id,
      title : this.reminderForm.value.title,
      content : this.reminderForm.value.content,
      created_at: this.reminder.created_at,
      set_at: this.reminder.set_at,
      updated_at: new Date()
    }

    console.log('rem: ',rem);

    const obs = (this.option==='new')?
    this.service.addReminder(rem) :
    this.service.updateReminder(this.reminder._id, rem);
    obs.subscribe(res =>{
      console.log(res);
      this.openSnackBar(res);

    });

  }

  setReminderTimeAt(event: MatDatepickerInputEvent<Date>) {
    // this.reminderForm.setValue(['set_at'], event.value)  ;
    console.log('change date: ', event.value);
    this.reminder.set_at = event.value;
  }

  openSnackBar(obj: any) {
    this._snackBar.open(obj.message, 'Hide', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    setTimeout(()=>this.goBack(), 1000)
  }

  goBack(){
    this.router.navigate(['reminders']);
  }
  delete(){
    if(confirm("Are you sure to delete "+this.reminder.title)) {
      this.service.deleteReminder(this.reminder._id).subscribe(res=>{
        console.log(res);
        this.openSnackBar(res);
      });
    }


  }

}
