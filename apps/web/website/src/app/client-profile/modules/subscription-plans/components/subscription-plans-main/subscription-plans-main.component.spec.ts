import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlansMainComponent } from './subscription-plans-main.component';

describe('SubscriptionPlansMainComponent', () => {
  let component: SubscriptionPlansMainComponent;
  let fixture: ComponentFixture<SubscriptionPlansMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPlansMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlansMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
