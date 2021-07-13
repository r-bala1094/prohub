import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingMethodsViewComponent } from './billing-methods-view.component';

describe('BillingMethodsViewComponent', () => {
  let component: BillingMethodsViewComponent;
  let fixture: ComponentFixture<BillingMethodsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingMethodsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingMethodsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
