import { StorageService } from './../storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username;
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    console.log('inside home');
    this.username = this.auth.userInfo.username;

  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']); //move to home after logout
  }

}
