import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingMethodsEditComponent } from './billing-methods-edit.component';

describe('BillingMethodsEditComponent', () => {
  let component: BillingMethodsEditComponent;
  let fixture: ComponentFixture<BillingMethodsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingMethodsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingMethodsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
