import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.scss']
})
export class LocationViewComponent implements OnInit {

  timeZone;
  addressLine1;
  addressLine2;
  country;
  state;
  city;
  zipCode;
  @Input ('details') details: any;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges () {
    if (this.details) {
      this.setData();
    }
  }

  setData () {
    this.timeZone = this.details.timeZone ? this.details.timeZone.TimeZone : '';
    this.addressLine1 = this.details.addressLineOne;
    this.addressLine2 = this.details.addressLineTwo;
    this.country = this.details.country ? this.details.country.name : '';
    this.state = this.details.state ? this.details.state.Subdivision_Name : '';
    this.city = this.details.city;
    this.zipCode = this.details.zipCode;
  }

}
