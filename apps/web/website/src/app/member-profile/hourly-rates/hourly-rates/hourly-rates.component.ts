import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prohub-hourly-rates',
  templateUrl: './hourly-rates.component.html',
  styleUrls: ['./hourly-rates.component.scss']
})
export class HourlyRatesComponent implements OnInit {

  currency = [];
  

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  handleMovePage(buttonType: string) {
    const url = buttonType === 'back' ? 'intro-video' : 'availability';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

}
