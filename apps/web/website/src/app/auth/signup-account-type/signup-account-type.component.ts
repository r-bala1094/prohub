import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-signup-account-type',
  templateUrl: './signup-account-type.component.html',
  styleUrls: ['./signup-account-type.component.scss']
})
export class SignupAccountTypeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(url) {
    this.router.navigateByUrl(url);
  }

  public routerLinkVariabletologin = "/auth/login";

}
