import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-password-and-security-main',
  templateUrl: './password-and-security-main.component.html',
  styleUrls: ['./password-and-security-main.component.scss']
})
export class PasswordAndSecurityMainComponent implements OnInit {

  isEdit = true;

  constructor() { }

  ngOnInit(): void {
  }

}
