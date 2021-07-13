import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from '../../../../services/client-profile.service';

@Component({
  selector: 'prohub-location-main',
  templateUrl: './location-main.component.html',
  styleUrls: ['./location-main.component.scss']
})
export class LocationMainComponent implements OnInit {

  isEdit = false;
  locationDetails;

  constructor(
    private clientProfileService: ClientProfileService
  ) { }

  ngOnInit(): void {
    this.getLocationDetails();
  }

  toggleEdit() {
    this.isEdit = false;
    this.getLocationDetails();
  }

  getLocationDetails() {
    this.clientProfileService.getLocation().subscribe((res: any) => {
      if (res.response && res.response.data) {
        this.locationDetails = res.response.data;
      }
    },(err: any)=> {
      console.log(err);
    });
  }

}
