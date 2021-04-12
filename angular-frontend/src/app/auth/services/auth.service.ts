import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public errorEvent = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public login(username, password) {
    return this.httpClient.post('/api/auth/login', { username, password })
      .subscribe((res) => {
        console.log(res);
      }, httpError => {
        console.log(httpError);
        this.errorEvent.emit(httpError.error);
      });
  }

  public register(username, email, password) {
    return this.httpClient.post('/api/auth/register', { username, email, password })
      .subscribe((res) => {
        console.log(res);
      }, httpError => {
        console.log(httpError);
        this.errorEvent.emit(httpError.error);
      });
  }
}
