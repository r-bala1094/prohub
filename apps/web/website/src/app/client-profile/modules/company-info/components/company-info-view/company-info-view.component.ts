import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-company-info-view',
  templateUrl: './company-info-view.component.html',
  styleUrls: ['./company-info-view.component.scss']
})
export class CompanyInfoViewComponent implements OnInit {

  nameCompany = 'Dummy Pvt. Ltd.';
  roleCompany = 'Director';
  organisation = 'Management';
  noOfEmployee = '100-499 employees';

  constructor() { }

  ngOnInit(): void {
  }

}
