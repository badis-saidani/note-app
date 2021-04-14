import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { AuthModule } from './auth/auth.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { StorageService } from './storage.service';
import { AuthService } from './auth/services/auth.service';
import { RegisterComponent } from './auth/components/register/register.component';
import { HeaderInterceptorService } from './utils/header-interceptor.service';


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
        {path: '**', redirectTo:''}

      ]
    ),
    NgbModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    AuthModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [StorageService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
