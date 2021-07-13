import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from '../../../../services/client-profile.service';

@Component({
  selector: 'prohub-profile-info-main',
  templateUrl: './profile-info-main.component.html',
  styleUrls: ['./profile-info-main.component.scss']
})
export class ProfileInfoMainComponent implements OnInit {

  profileDetails;
  isEdit = false;

  constructor(
    private clientProfileService: ClientProfileService
  ) { }

  ngOnInit(): void {
    this.clientProfileService.login().subscribe(val => {
      this.clientProfileService.setToken(val['response'].data.token);
      this.getProfileInfo();
    }, (err: any)=> {
      console.log(err);
    });
  }

  toggleEdit() {
    this.isEdit = false;
    this.getProfileInfo();
  }

  getProfileInfo() {
    this.clientProfileService.getProfileInfo().subscribe((res: any) => {
      if (res.response && res.response.data) {
        this.profileDetails = res.response.data.profileUserDetail;
      }
    },(err: any)=> {
      console.log(err);
    });
  }

}
