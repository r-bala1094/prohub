import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from '../../../../services/client-profile.service';

@Component({
  selector: 'prohub-objects-and-services-main',
  templateUrl: './objects-and-services-main.component.html',
  styleUrls: ['./objects-and-services-main.component.scss']
})
export class ObjectsAndServicesMainComponent implements OnInit {

  isEditServices = false;
  isEditObjectives = false;
  objectivesDetails;
  servicesDetails;

  constructor(
    private clientService: ClientProfileService
  ) { }

  ngOnInit(): void {
    this.getObjectivesAndServices();
  }

  getObjectivesAndServices() {
    this.clientService.getObjectivesAndServices().subscribe((res: any) => {
      if (res.response && res.response.data) {
        if (res.response.data.services) {
          this.servicesDetails = res.response.data.services;
        }
        if (res.response.data.objectives) {
          this.objectivesDetails = res.response.data.objectives;
        }
      }
    });
  }

  toggleObjectives() {
    this.isEditObjectives = false;
    this.getObjectivesAndServices();
  }

  toggleServices() {
    this.isEditServices = false;
    this.getObjectivesAndServices();
  }

}
