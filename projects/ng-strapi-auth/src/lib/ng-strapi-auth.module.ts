import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgStrapiAuthService } from './ng-strapi-auth.service';
import { NgStrapiJwtInterceptorService } from './ng-strapi-jwt-interceptor.service';

import { NgStrapiAuthConfig } from './ng-strapi-auth-config';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule
  ],
  exports: [ ]
})
export class NgStrapiAuthModule {

  public static forRoot(config: NgStrapiAuthConfig): ModuleWithProviders {
    return {
      ngModule: NgStrapiAuthModule,
      providers: [
        NgStrapiAuthService,
        { provide: 'config', useValue: config },
        NgStrapiJwtInterceptorService
      ]
    };
  }

}
