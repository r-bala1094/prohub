import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceMainComponent } from './preference-main.component';

describe('PreferenceMainComponent', () => {
  let component: PreferenceMainComponent;
  let fixture: ComponentFixture<PreferenceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
