import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';

interface pdfImport {
  aboutMe: boolean,
  experience: boolean,
  education: boolean,
  skills: boolean
}
@Component({
  selector: 'prohub-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.scss']
})

export class UploadCvComponent implements OnInit {

  pdf: ArrayBuffer | any; // stores the file uploaded
  // stores the check box values from the html
  pdfImportCheckBox : pdfImport= {
    aboutMe: false,
    experience: false,
    education: false,
    skills: false
  }

  pdfName: string; // name of the file uploaded

  constructor(private individualMemberSignupStateService: IndividualMemberSignupStateService, private router: Router) {

  }

  ngOnInit(): void {
    this.individualMemberSignupStateService.getUploadCV.subscribe(
      (data: any) => {
        this.pdfName = data.pdfName;
        this.pdfImportCheckBox = data.pdfImportCheckBox;
      }
    );
  }

  handleMovePage(buttonType: string) {
    this.individualMemberSignupStateService.setUploadCV(this.pdf, this.pdfImportCheckBox);
    const url = buttonType === 'next' ? 
        'profile-info' 
      : '';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

  onSelectFile(fileObject) {
    if (fileObject.files && fileObject.files[0]) {
      this.pdf = fileObject.files[0];
      this.pdfName = fileObject.files[0].name;
    }
  }

  assertErr(fileObject) {
    this.pdfName = 'Error occured while loading file : ' + fileObject.files[0].name;
  }
}
