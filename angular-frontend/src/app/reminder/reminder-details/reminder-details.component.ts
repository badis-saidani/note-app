import { StorageService } from './../../storage.service';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.css']
})
export class ReminderDetailsComponent implements OnInit {

  reminder;
  // options: FormGroup;
  // hideRequiredControl = new FormControl(false);
  // floatLabelControl = new FormControl('auto');
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private storage: StorageService) {

    this.reminder = this.router.getCurrentNavigation().extras.state;
    console.log(this.reminder);

    // this.options = fb.group({
    //   hideRequired: this.hideRequiredControl,
    //   floatLabel: this.floatLabelControl,
    // });

  }

  ngOnInit(): void {
    console.log('in details');
    console.log(this.storage.getCurrentUserInfo());


    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
