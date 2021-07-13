import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAndSecurityViewComponent } from './password-and-security-view.component';

describe('PasswordAndSecurityViewComponent', () => {
  let component: PasswordAndSecurityViewComponent;
  let fixture: ComponentFixture<PasswordAndSecurityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordAndSecurityViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordAndSecurityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
