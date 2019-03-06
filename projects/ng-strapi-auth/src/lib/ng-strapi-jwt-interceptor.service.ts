import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { NgStrapiAuthService } from './ng-strapi-auth.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgStrapiJwtInterceptorService {

  constructor(
    private authSrv: NgStrapiAuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authSrv.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ this.authSrv.jwt }`
        }
      });
    }

    return next.handle(request);
  }
}
