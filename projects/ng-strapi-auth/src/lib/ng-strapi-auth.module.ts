import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgStrapiAuthService } from './ng-strapi-auth.service';

import { StrapiAuthConfig } from './strapi-auth-config';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule
  ],
  exports: [ ]
})
export class NgStrapiAuthModule {

  public static forRoot(config: StrapiAuthConfig): ModuleWithProviders {
    return {
      ngModule: NgStrapiAuthModule,
      providers: [
        NgStrapiAuthService,
        { provide: 'config', useValue: config }
      ]
    };
  }

}
