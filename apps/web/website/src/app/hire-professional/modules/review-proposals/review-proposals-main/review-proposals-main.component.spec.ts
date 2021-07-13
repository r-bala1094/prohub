import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProposalsMainComponent } from './review-proposals-main.component';

describe('ReviewProposalsMainComponent', () => {
  let component: ReviewProposalsMainComponent;
  let fixture: ComponentFixture<ReviewProposalsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewProposalsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewProposalsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
