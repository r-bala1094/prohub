import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';

interface getProfilePicParams {
  profilePic: string | ArrayBuffer,
  firstName: string,
  lastName: string
  }

@Component({
  selector: 'prohub-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})

export class ProfileInfoComponent implements OnInit {

  @Output() moveThePage = new EventEmitter();

  profilePic: string | ArrayBuffer = ''
  firstName: string;
  lastName: string;
  // file to be sent to server
  profilePicFile: ArrayBuffer | any;

  constructor(private individualMemberSignupStateService: IndividualMemberSignupStateService, private router: Router ) { }

  ngOnInit(): void {
    this.individualMemberSignupStateService.getProfileInfo.subscribe(
      (data: any) => {
        this.profilePic = data.profilePic;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
      }
    );
  }

  handleMovePage(buttonType: string) {
    this.individualMemberSignupStateService.setProfileInfo(this.profilePicFile, this.firstName, this.lastName);
    const url = buttonType === 'back' ?
        'upload-cv'
      : 'about-me';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

  onSelectFile(fileObject) {
    if (fileObject.files && fileObject.files[0]) {
      var reader = new FileReader();
      this.profilePicFile = fileObject.files[0];

      reader.readAsDataURL(fileObject.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.profilePic = event.target.result;
      }
    }
  }
}
