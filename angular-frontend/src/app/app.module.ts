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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RegisterComponent } from './auth/components/register/register.component';
import { StorageService } from './storage.service';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthService } from './auth/services/auth.service';


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

        {path: '', component: HomeComponent},
        {path: 'reminders', loadChildren: () => import('./reminder/reminder.module').then(m=>m.ReminderModule)},
        {path: 'notes', loadChildren: () => import('./notebook/notebook.module').then(m=>m.NotebookModule)},
        { path: '**', redirectTo: '' }

      ]
    ),
    NgbModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    AuthModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthInterceptor, StorageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
