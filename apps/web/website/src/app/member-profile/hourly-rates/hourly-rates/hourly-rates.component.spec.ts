import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyRatesComponent } from './hourly-rates.component';

describe('HourlyRatesComponent', () => {
  let component: HourlyRatesComponent;
  let fixture: ComponentFixture<HourlyRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
