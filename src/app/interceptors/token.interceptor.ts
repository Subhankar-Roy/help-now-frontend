import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler , HttpEvent , HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  jwt_token: string;
  constructor() {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.jwt_token = localStorage.getItem('_token');
    if (this.jwt_token) {
      // Logged in. Add Bearer token.
      return next.handle(
        request.clone({
          headers: request.headers.append('Authorization', 'Bearer ' + this.jwt_token)
        })
      );
    }
    // Not logged in. Continue without modification.
    return next.handle(request);
  }
}
