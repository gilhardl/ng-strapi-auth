import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgStrapiAuthComponent } from './ng-strapi-auth.component';
import { NgStrapiAuthService } from './ng-strapi-auth.service';

import { StrapiAuthConfig } from './strapi-auth-config';

@NgModule({
  declarations: [NgStrapiAuthComponent],
  imports: [
  ],
  exports: [NgStrapiAuthComponent]
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
