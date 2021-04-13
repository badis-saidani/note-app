import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  domain: string = "http://localhost:3000/api";
  constructor(private http: HttpClient, private authService : AuthService){}

  getNoteBooks(){
    let endPoint = this.domain + "/notebooks";
    
    return this.http.get(endPoint)
      .pipe(map((res: any) => res));
  }

  addNoteBook(payload: object){
    let endPoint = this.domain + "/notebooks";
    return this.http.post(endPoint, payload)
      .pipe(map((res: any) => res));
  }

  deleteNoteBook(name){
    let endPoint = this.domain + "/notebooks/" + name;
    return this.http.delete(endPoint)
      .pipe(map((res: any) => res));
  }

}
