import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  username: string;
  email: string;
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
    const token = this.authService.register(this.username, this.email, this.password);
  }

  alertClose() {
    this.errorMessage = null;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}
