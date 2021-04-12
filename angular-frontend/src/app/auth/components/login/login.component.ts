import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;

  errorSubscription: Subscription;
  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.errorSubscription = this.authService.errorEvent.subscribe(error => {
      this.errorMessage = error.error;
    })
  }


  onSubmit() {
    const token = this.authService.login(this.username, this.password);
  }

  alertClose() {
    this.errorMessage = null;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
