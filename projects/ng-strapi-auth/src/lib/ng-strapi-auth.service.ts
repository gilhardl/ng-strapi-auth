import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StrapiAuthConfig } from './strapi-auth-config';

@Injectable({
  providedIn: 'root'
})
export class NgStrapiAuthService {

  public user = undefined;
  public jwt = undefined;
  public authenticated = false;

  private apiUrl: string = undefined;

  constructor( 
    @Inject('config') private config: StrapiAuthConfig,
    private httpClient: HttpClient
  ) {
    if (this.config && this.config.apiUrl) {
      this.apiUrl = this.config.apiUrl;
    } else {
      const err = '[NgStrapiAuth]: no api url provided';
      console.error(err);
      throw new Error('[NgStrapiAuth]: no api url provided');
    }
  }

  async signIn(username: string, password: string) {
    if (this.apiUrl) { throw new Error('[NgStrapiAuth]: no api url provided'); }

    try {
      const res: any = await this.httpClient.post(this.apiUrl + '/auth/local', { identifier: username, password: password }).toPromise();

      this.user = res.user;
      this.jwt = res.jwt;
      this.authenticated = true;

      return this.user;

    } catch (err) {
      throw err;
    }
  }

}
