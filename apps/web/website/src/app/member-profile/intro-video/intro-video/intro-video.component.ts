import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';

@Component({
  selector: 'prohub-intro-video',
  templateUrl: './intro-video.component.html',
  styleUrls: ['./intro-video.component.scss']
})


export class IntroVideoComponent implements OnInit {

  video: ArrayBuffer;
  preViewVideo: any;

  constructor(private individualMemberSignupStateService: IndividualMemberSignupStateService, private router: Router, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.individualMemberSignupStateService.getIntroVideo().subscribe(
      (data: any) => {
        this.preViewVideo = data.response.hasOwnProperty('data') ?
          data.response.data.Location : '';
      }
    );
  }

  deleteVideo() {
    // api is not available
  }

  handleMovePage(buttonType: string) {
    // this.individualMemberSignupStateService.setUploadCV(this.pdf, this.pdfImportCheckBox);
    const url = buttonType === 'back' ?
        'project-services'
      : 'hourly-rates';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

  onSelectVideo(fileObject) {
    if (fileObject.files && fileObject.files[0]) {
      this.video = fileObject.files[0];

      this.individualMemberSignupStateService.setIntroVideo(this.video).subscribe(
        (data:any) => this.preViewVideo = data.response.data.Location
      );
    }
  }


}
