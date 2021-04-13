import { StorageService } from './../storage.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username;
  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    console.log('inside home');
    this.username = this.storage.getCurrentUserInfo().username;

  }

}
