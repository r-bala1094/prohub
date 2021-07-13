import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingPreferenceMainComponent } from './working-preference-main.component';

describe('WorkingPreferenceMainComponent', () => {
  let component: WorkingPreferenceMainComponent;
  let fixture: ComponentFixture<WorkingPreferenceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingPreferenceMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingPreferenceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
