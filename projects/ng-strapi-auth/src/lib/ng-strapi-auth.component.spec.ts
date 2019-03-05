import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStrapiAuthComponent } from './ng-strapi-auth.component';

describe('NgStrapiAuthComponent', () => {
  let component: NgStrapiAuthComponent;
  let fixture: ComponentFixture<NgStrapiAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgStrapiAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgStrapiAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
