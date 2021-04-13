import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentUserInfo = {
    token: 'badissaidani',
    username: 'Badis SAIDANI',
    email: 'bsaidani@miu.edu'
  }

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveCurrentUserInfo(userInfo) {
    this.currentUserInfo = userInfo
  }

  public getCurrentUserInfo() {
    return this.currentUserInfo;
  }


}
