import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient){}

  domain: string = "http://localhost:3000/api";

  getNotes(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    let endPoint = this.domain + "/notebooks";
    console.log("Fetching: " + endPoint);

    return this.http.get(endPoint)
      .pipe(map((res: any) => res));
  }

  getNoteContent(notebookName: string, noteTitle: string){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    let endPoint = this.domain + "/notebooks/" + notebookName + "/notes/" + noteTitle;
    console.log("Fetching: " + endPoint);

    return this.http.get(endPoint)
        .pipe(map((res: any) => res));

  }

  deleteNote(notebookName: string, noteTitle: string){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    let endPoint = this.domain + "/notebooks/" + notebookName + "/notes/" + noteTitle;
    console.log("Delete: " + endPoint);

    return this.http.delete(endPoint)
      .pipe(map((res: any) => res));
  }

  addNote(notebookName: string, payload: object){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let endPoint = this.domain + "/notebooks/" + notebookName + "/notes";
    console.log(`Adding ${notebookName} - ${payload}`);

    return this.http.post(endPoint, payload)
              .pipe(map((res: any) => res));

  }

  updateNote(notebookName: string, noteTitle: string, payload: object){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let endPoint = this.domain + "/notebooks/" + notebookName + "/notes/" + noteTitle;
    console.log(`Updating ${notebookName} - ${payload}`);

    return this.http.patch(endPoint, payload)
              .pipe(map((res: any) => res));
  }

}
