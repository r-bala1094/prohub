import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivesDeliverablesComponent } from './objectives-deliverables.component';

describe('ObjectivesDeliverablesComponent', () => {
  let component: ObjectivesDeliverablesComponent;
  let fixture: ComponentFixture<ObjectivesDeliverablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectivesDeliverablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesDeliverablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
