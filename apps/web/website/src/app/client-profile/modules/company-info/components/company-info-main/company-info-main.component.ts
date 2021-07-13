import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-company-info-main',
  templateUrl: './company-info-main.component.html',
  styleUrls: ['./company-info-main.component.scss']
})
export class CompanyInfoMainComponent implements OnInit {

  isEdit = false;

  constructor() { }

  ngOnInit(): void {
  }

}
