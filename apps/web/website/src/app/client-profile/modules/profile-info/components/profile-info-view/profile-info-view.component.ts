import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'prohub-profile-info-view',
  templateUrl: './profile-info-view.component.html',
  styleUrls: ['./profile-info-view.component.scss']
})
export class ProfileInfoViewComponent {
  profilePic = '';
  name;
  email;
  @Input('details') details: any;

  constructor() { }

  ngOnChanges () {
    if (this.details) {
      this.setData();
    }
  }

  setData () {
    this.name = `${this.details.firstname} ${this.details.surname}`;
    this.email = this.details.email;
  }

}
