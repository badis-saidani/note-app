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
  constructor(private storage: StorageService, private auth: AuthService) { }

  ngOnInit(): void {
    console.log('inside home');
    this.username = this.storage.getCurrentUserInfo().username;

  }

  logout() {
    this.auth.signOut();
  }

}
