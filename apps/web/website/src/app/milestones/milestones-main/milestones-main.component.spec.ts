import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonesMainComponent } from './milestones-main.component';

describe('MilestonesMainComponent', () => {
  let component: MilestonesMainComponent;
  let fixture: ComponentFixture<MilestonesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestonesMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestonesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
