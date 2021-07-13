import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlansViewComponent } from './subscription-plans-view.component';

describe('SubscriptionPlansViewComponent', () => {
  let component: SubscriptionPlansViewComponent;
  let fixture: ComponentFixture<SubscriptionPlansViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPlansViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlansViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
