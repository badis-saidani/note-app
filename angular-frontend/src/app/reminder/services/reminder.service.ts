import { StorageService } from './../../storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  private baseUrl = `http://localhost:3000/api/reminders`;
  private accessToken = 'badissaidani';
  private uid = "6072f471f3b966fd400f112b";

  constructor(public http: HttpClient, private storage: StorageService) {
    this.uid = storage.getCurrentUserInfo().uid;
  }

  getReminders(){
    return this.http.get<[]>(`${this.baseUrl}/${this.uid}`, {headers: {'x-access-token':this.accessToken}});
  }
  getReminderDetails(id: string){
    return this.http.get<[]>(`${this.baseUrl}/${this.uid}/${id}`);
  }

  addReminder(reminder: any){
    return this.http.post(`${this.baseUrl}/${this.uid}`, reminder, {headers: {'x-access-token':this.accessToken}});
  }
  updateReminder(id:string, reminder: any){
    return this.http.patch(`${this.baseUrl}/${this.uid}/${id}`, reminder, {headers: {'x-access-token':this.accessToken}});
  }

  deleteReminder(id:string){
    return this.http.delete(`${this.baseUrl}/${this.uid}/${id}`,  {headers: {'x-access-token':this.accessToken}});
  }

}
