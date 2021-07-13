import { Router } from '@angular/router/';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(url:string) {
    this.router.navigate([url]);
  }

}
