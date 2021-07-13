import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsListMainComponent } from './proposals-list-main.component';

describe('ProposalsListMainComponent', () => {
  let component: ProposalsListMainComponent;
  let fixture: ComponentFixture<ProposalsListMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalsListMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
