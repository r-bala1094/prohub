import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPointsComponent } from './buy-points.component';

describe('BuyPointsComponent', () => {
  let component: BuyPointsComponent;
  let fixture: ComponentFixture<BuyPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
