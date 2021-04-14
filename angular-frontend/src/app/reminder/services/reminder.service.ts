import { AuthService } from 'src/app/auth/services/auth.service';
import { StorageService } from './../../storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  private baseUrl = `http://localhost:3000/api/reminders`;
  private accessToken;
  private uid;

  constructor(public http: HttpClient, private auth: AuthService) {
    auth.getUserInfo()
    this.uid = auth.userInfo.uid;
    this.accessToken = auth.token;
    console.log(auth.userInfo);

    console.log('uid: ' , this.uid);
    console.log('accessToken: ' , this.accessToken);

  }

  getReminders(){
    return this.http.get<[]>(`${this.baseUrl}/${this.uid}`);
  }
  getReminderDetails(id: string){
    return this.http.get<[]>(`${this.baseUrl}/${this.uid}/${id}`);
  }

  addReminder(reminder: any){
    return this.http.post(`${this.baseUrl}/${this.uid}`, reminder);
  }
  updateReminder(id:string, reminder: any){
    return this.http.patch(`${this.baseUrl}/${this.uid}/${id}`, reminder);
  }

  deleteReminder(id:string){
    return this.http.delete(`${this.baseUrl}/${this.uid}/${id}`);
  }

}
