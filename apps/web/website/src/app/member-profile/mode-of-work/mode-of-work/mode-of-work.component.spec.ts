import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeOfWorkComponent } from './mode-of-work.component';

describe('ModeOfWorkComponent', () => {
  let component: ModeOfWorkComponent;
  let fixture: ComponentFixture<ModeOfWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeOfWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
