import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `<router-outlet></router-outlet>`
})
export class AuthMainComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }
}
