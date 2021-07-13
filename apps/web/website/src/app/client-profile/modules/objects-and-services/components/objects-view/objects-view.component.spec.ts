import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsViewComponent } from './objects-view.component';

describe('ObjectsViewComponent', () => {
  let component: ObjectsViewComponent;
  let fixture: ComponentFixture<ObjectsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
