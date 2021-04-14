import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {

  }

  intercept(req, next) {
    let header: object = {'Content-Type': 'application/json'};    
    let authService = this.injector.get(AuthService);
    if (authService.token){
      header = {...header, 'x-access-token': authService.token};
    }
    
    let newReq = req.clone({
      setHeaders: header
    });
    return next.handle(newReq);
  }
}
