import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAndSecurityEditComponent } from './password-and-security-edit.component';

describe('PasswordAndSecurityEditComponent', () => {
  let component: PasswordAndSecurityEditComponent;
  let fixture: ComponentFixture<PasswordAndSecurityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordAndSecurityEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordAndSecurityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
