import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAndSecurityMainComponent } from './password-and-security-main.component';

describe('PasswordAndSecurityMainComponent', () => {
  let component: PasswordAndSecurityMainComponent;
  let fixture: ComponentFixture<PasswordAndSecurityMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordAndSecurityMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordAndSecurityMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
