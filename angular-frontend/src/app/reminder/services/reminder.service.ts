import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  private baseUrl = `http://localhost:3000/api/reminders`;
  private accessToken = 'badissaidani';
  private uid = "6072f471f3b966fd400f112b";

  constructor(public http: HttpClient) { }

  getReminders(){
    return this.http.get<[]>(`${this.baseUrl}/${this.uid}`, {headers: {'x-access-token':this.accessToken}});
  }
  getReminderDetails(id: string){
    return this.http.get<[]>(`${this.baseUrl}/${this.uid}/${id}`);
  }

  addReminder(reminder: any){
    return this.http.post(this.baseUrl, reminder, {headers: {'x-access-token':this.accessToken}});
  }
  updateReminder(id:string, reminder: any){
    return this.http.post(`${this.baseUrl}/${id}`, reminder);
  }
}
