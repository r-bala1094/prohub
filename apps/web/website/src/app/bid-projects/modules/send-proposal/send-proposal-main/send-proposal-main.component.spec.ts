import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendProposalMainComponent } from './send-proposal-main.component';

describe('SendProposalMainComponent', () => {
  let component: SendProposalMainComponent;
  let fixture: ComponentFixture<SendProposalMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendProposalMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendProposalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
