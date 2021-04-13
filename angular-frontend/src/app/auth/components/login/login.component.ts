import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }


  onSubmit() {
    this.alertClose();
    this.authService.login(this.username, this.password).subscribe(() => {

    }, error => {
      this.errorMessage = error.error.error;
    });
  }

  alertClose() {
    this.errorMessage = null;
  }

}
