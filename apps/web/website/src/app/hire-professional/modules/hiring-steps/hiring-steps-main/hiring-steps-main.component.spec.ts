import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringStepsMainComponent } from './hiring-steps-main.component';

describe('HiringStepsMainComponent', () => {
  let component: HiringStepsMainComponent;
  let fixture: ComponentFixture<HiringStepsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringStepsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringStepsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
