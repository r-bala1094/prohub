import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOptionsComponent } from './country-options.component';

describe('CountryOptionsComponent', () => {
  let component: CountryOptionsComponent;
  let fixture: ComponentFixture<CountryOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
