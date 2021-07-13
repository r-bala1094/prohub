import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePlansComponent } from './available-plans.component';

describe('AvailablePlansComponent', () => {
  let component: AvailablePlansComponent;
  let fixture: ComponentFixture<AvailablePlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
