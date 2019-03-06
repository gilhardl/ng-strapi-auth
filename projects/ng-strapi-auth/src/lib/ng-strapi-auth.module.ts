import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
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

export function ngStrapiAuthFactory(injector: Injector): () => Promise<boolean> {
  const authSrv = injector.get(NgStrapiAuthService);
  return async() => {
    try {
      await authSrv.autoSignIn();
      return true;
    } catch (err) {
      return false;
    }
  }
}