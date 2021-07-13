import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoMainComponent } from './company-info-main.component';

describe('CompanyInfoMainComponent', () => {
  let component: CompanyInfoMainComponent;
  let fixture: ComponentFixture<CompanyInfoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInfoMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
