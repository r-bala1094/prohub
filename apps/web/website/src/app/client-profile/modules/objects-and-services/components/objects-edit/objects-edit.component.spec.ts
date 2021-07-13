import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsEditComponent } from './objects-edit.component';

describe('ObjectsEditComponent', () => {
  let component: ObjectsEditComponent;
  let fixture: ComponentFixture<ObjectsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
