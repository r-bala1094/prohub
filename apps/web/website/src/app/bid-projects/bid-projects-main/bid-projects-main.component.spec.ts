import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidProjectsMainComponent } from './bid-projects-main.component';

describe('BidProjectsMainComponent', () => {
  let component: BidProjectsMainComponent;
  let fixture: ComponentFixture<BidProjectsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidProjectsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidProjectsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
