import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsAndServicesMainComponent } from './objects-and-services-main.component';

describe('ObjectsAndServicesMainComponent', () => {
  let component: ObjectsAndServicesMainComponent;
  let fixture: ComponentFixture<ObjectsAndServicesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsAndServicesMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsAndServicesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
