import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingMethodsMainComponent } from './billing-methods-main.component';

describe('BillingMethodsMainComponent', () => {
  let component: BillingMethodsMainComponent;
  let fixture: ComponentFixture<BillingMethodsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingMethodsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingMethodsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
