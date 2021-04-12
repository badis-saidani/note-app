
import { ReminderService } from './services/reminder.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RemindersComponent } from './reminders/reminders.component';
import { ReminderDetailsComponent } from './reminder-details/reminder-details.component';
import { DemoMaterialModule } from '../material-module';
import { ReactiveFormsModule } from '@angular/forms';

const reminderRoute: Routes = [
  {path: '', component: RemindersComponent},
  {path: ':id', component: ReminderDetailsComponent},

];

@NgModule({
  declarations: [
    RemindersComponent,
    ReminderDetailsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(reminderRoute)
  ],
  providers: [ReminderService]
})
export class ReminderModule { }
