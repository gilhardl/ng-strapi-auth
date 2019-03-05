import { TestBed } from '@angular/core/testing';

import { NgStrapiAuthService } from './ng-strapi-auth.service';

describe('NgStrapiAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgStrapiAuthService = TestBed.get(NgStrapiAuthService);
    expect(service).toBeTruthy();
  });
});
