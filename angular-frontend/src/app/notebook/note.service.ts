import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private authService : AuthService){}

  domain: string = "http://localhost:3000/api";

  getNotes(){
    let endPoint = this.domain + "/notebooks";
    console.log("Fetching: " + endPoint);

    return this.http.get(endPoint)
      .pipe(map((res: any) => res));
  }

  getNoteContent(notebookName: string, noteTitle: string){
    
    let endPoint = this.domain + "/notebooks/" + notebookName + "/notes/" + noteTitle;
    console.log("Fetching: " + endPoint);

    return this.http.get(endPoint)
        .pipe(map((res: any) => res));

  }

  // buildHeader(){
  //   // return { headers: { 
  //   //           'x-access-token': this.authService.token, 
  //   //           'Content-Type': 'application/json' 
  //   //           }
  //   //       };
  // }

  deleteNote(notebookName: string, noteTitle: string){
    
    let endPoint = this.domain + "/notebooks/" + notebookName + "/notes/" + noteTitle;
    console.log("Delete: " + endPoint);

    return this.http.delete(endPoint)
      .pipe(map((res: any) => res));
  }

  addNote(notebookName: string, payload: object){

    let endPoint = this.domain + "/notebooks/" + notebookName + "/notes";
    console.log(`Adding ${notebookName} - ${payload}`);

    return this.http.post(endPoint, payload)
              .pipe(map((res: any) => res));

  }

  updateNote(notebookName: string, noteTitle: string, payload: object){

    let endPoint = this.domain + "/notebooks/" + notebookName + "/notes/" + noteTitle;
    console.log(`Updating ${notebookName} - ${payload}`);

    return this.http.patch(endPoint, payload)
              .pipe(map((res: any) => res));
  }

}
