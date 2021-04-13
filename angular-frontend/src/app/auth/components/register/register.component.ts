import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }


  onSubmit() {
    this.alertClose();
    if (this.password === this.confirmPassword) {
      this.authService.register(this.username, this.email, this.password).subscribe(() => {
      }, error => {
        this.errorMessage = error.error.error;
      });
    }
    else {
      this.errorMessage = "Please make sure your passwords match."
    }
  }

  alertClose() {
    this.errorMessage = null;
  }

}
