import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';
  token = 'our token will go here'
  constructor(public auth: AuthService) {

  }

  ngOnInit() {
    this.auth.getUserInfo();
  }
}
