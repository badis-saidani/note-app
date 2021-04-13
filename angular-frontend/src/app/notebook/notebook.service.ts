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

  buildHeader(){
    return { headers: { 
              'x-access-token': this.authService.token, 
              'Content-Type': 'application/json' 
              }
          };
  }

  getNoteBooks(){
    let endPoint = this.domain + "/notebooks";
    
    return this.http.get(endPoint, this.buildHeader())
      .pipe(map((res: any) => res));
  }

}
