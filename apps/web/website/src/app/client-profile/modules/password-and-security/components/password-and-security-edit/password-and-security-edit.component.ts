import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'prohub-password-and-security-edit',
  templateUrl: './password-and-security-edit.component.html',
  styleUrls: ['./password-and-security-edit.component.scss']
})
export class PasswordAndSecurityEditComponent implements OnInit {
  passwordDetails: FormGroup;
  hide = true;
  isPwdMatched = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.passwordDetails = this.fb.group({
      oldPwd: ['', Validators.required],
      newPwd: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    });
  }

  onUpdateClick() {
    console.log('onUpdateClick');
  }

  onCancelClick() {
    console.log('onCancelClick');
  }
}
