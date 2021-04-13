import { AuthInterceptor } from './auth/auth-interceptor.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { AuthModule } from './auth/auth.module';
import { RegisterComponent } from './auth/components/register/register.component';
import { NotebookModule } from './notebook/notebook.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {path: '', component: AppComponent},
        {path: 'reminders', loadChildren: () => import('./reminder/reminder.module').then(m=>m.ReminderModule)},
        {path: 'notes', loadChildren: () => import('./notebook/notebook.module').then(m=>m.NotebookModule)},
      ]
    ),
    NgbModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    AuthModule
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
