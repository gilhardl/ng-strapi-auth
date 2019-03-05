import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgStrapiAuthService {

  constructor( @Inject('config') private config ) { }
}
