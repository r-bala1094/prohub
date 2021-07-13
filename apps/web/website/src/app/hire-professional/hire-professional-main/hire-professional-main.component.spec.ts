import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireProfessionalMainComponent } from './hire-professional-main.component';

describe('HireProfessionalMainComponent', () => {
  let component: HireProfessionalMainComponent;
  let fixture: ComponentFixture<HireProfessionalMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireProfessionalMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireProfessionalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
