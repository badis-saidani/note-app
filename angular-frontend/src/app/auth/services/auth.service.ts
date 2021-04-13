import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;

  public userInfo: {
    username: string,
    email: string
  } = null;

  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem('token');
    this.token = token;
  }

  public saveCurrentUserInfo(userInfo) {
    this.token = userInfo.token;
    localStorage.setItem('token', userInfo.token);

    this.userInfo = userInfo;
  }

  public getCurrentUserInfo() {
    return this.userInfo;
  }


  public getUserInfo() {
    if (this.token) {
      this.httpClient.get<any>('/api/auth', { headers: { 'x-access-token': this.token } })
        .subscribe((userInfo) => {
          this.userInfo = userInfo;
        }, error => {
          console.error(error);
        });
    }
  }

  public login(username, password) {
    return this.httpClient.post('/api/auth/login', { username, password })
      .pipe(
        tap(userInfo => {
          this.saveCurrentUserInfo(userInfo);
        })
      );
  }

  public register(username, email, password) {
    return this.httpClient.post('/api/auth/register', { username, email, password });
  }

  public signOut() {
    this.token = null;
    localStorage.removeItem('token');
    this.userInfo = null;
  }

}
