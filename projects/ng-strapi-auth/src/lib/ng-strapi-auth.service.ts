import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgStrapiAuthConfig } from './ng-strapi-auth-config';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgStrapiAuthService {

  public authStateChanges$: Observable<boolean>;
  public user = undefined;
  public jwt = undefined;
  public authenticated = false;

  private apiUrl: string = undefined;
  private authStateChangesSubject: Subject<boolean> = new Subject();

  constructor( 
    @Inject('config') private config: NgStrapiAuthConfig,
    private httpClient: HttpClient
  ) {
    if (this.config && this.config.apiUrl) {
      this.apiUrl = this.config.apiUrl;
    } else {
      const err = '[NgStrapiAuth]: no api url provided';
      console.error(err);
      throw new Error('[NgStrapiAuth]: no api url provided');
    }

    this.authStateChanges$ = this.authStateChangesSubject.asObservable();
  }

  async autoSignIn() {
    if (!this.apiUrl) { throw new Error('[NgStrapiAuth]: no api url provided'); }

    const credentials = this.getSavedCredentials();

    if (credentials) {
      this.user = credentials.user;
      this.jwt = credentials.jwt;
      this.authenticated = true;
      this.authStateChangesSubject.next(this.authenticated);

      return this.user;
      
    } else {
      throw new Error('[NgStrapiAuth]: no user auto signed in');
    }
  }

  async signIn(username: string, password: string) {
    if (!this.apiUrl) { throw new Error('[NgStrapiAuth]: no api url provided'); }

    try {
      const res: any = await this.httpClient.post(this.apiUrl + '/auth/local', { identifier: username, password: password }).toPromise();

      this.user = res.user;
      this.jwt = res.jwt;
      this.authenticated = true;
      this.saveCredentials();
      this.authStateChangesSubject.next(this.authenticated);

      return this.user;

    } catch (err) {
      throw err;
    }
  }

  async signOut() {
    this.user = undefined;
    this.jwt = undefined;
    this.authenticated = false;
    this.unsaveCredentials();
    this.authStateChangesSubject.next(this.authenticated);

    return true;
  }

  async register(username: string, email: string, password: string) {
    if (!this.apiUrl) { throw new Error('[NgStrapiAuth]: no api url provided'); }

    try {
      const res: any = await this.httpClient.post(this.apiUrl + '/auth/local/register', { username: username, email: email, password: password }).toPromise();

      this.user = res.user;
      this.jwt = res.jwt;
      this.authenticated = true;
      this.saveCredentials();
      this.authStateChangesSubject.next(this.authenticated);

      return this.user;

    } catch (err) {
      throw err;
    }
  }

  private getSavedCredentials() {
    const user = localStorage.getItem('current-user');
    const jwt = localStorage.getItem('current-user-jwt');

    if (user && jwt) {
      return {
        user: user,
        jwt: jwt
      };
    } else {
      return undefined;
    }
  }

  private saveCredentials() {
    if (this.user) {
      localStorage.setItem('current-user', this.user);
    }
    if (this.jwt) {
      localStorage.setItem('current-user-jwt', this.jwt);
    }
  }

  private unsaveCredentials() {
    localStorage.removeItem('current-user');
    localStorage.removeItem('current-user-jwt');
  }

}
