import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';
import { Router } from '@angular/router';

interface University {
  universityName: string,
  universityState: string,
  universityLink: string,
  universityCountry: string,
  location: {
      lat: string,
      long: string
  },
  universityId: string
}
interface educationCertificationFormData {
  id: number,
  title: string,
  university: University,
  startDate: Date,
  endDate: Date,
  notYetPassedOut: boolean,
  description: string
}

@Component({
  selector: 'prohub-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})

export class EducationComponent implements OnInit {

  @Output() moveThePage = new EventEmitter();

  displayForm: boolean = false;
  formCreateType: string;

  FormDataToBeEdited: educationCertificationFormData;
  constructor(
    public individualMemberSignupStateService: IndividualMemberSignupStateService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  workExperienceFormGroup: FormGroup;

  ngOnInit(): void {
    this.individualMemberSignupStateService.getEducationCertificationData.subscribe();
  }

  handleMovePage(buttonType: string) {
    const url = buttonType === 'back' ?
        'work-experience'
      : 'categories';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

  formUpdateHandler(action: string, index: number) {
    if (action === 'createNewForm') {
      this.formCreateType = 'new';
      this.displayForm = true;
    } else if (action === 'close') {
      this.formCreateType = 'close';
      this.displayForm = false;
    } else if (action === 'edit') {
      this.formCreateType = 'edit';
      this.setEditFormData(index);
      this.displayForm = true;
    } else if (action === 'delete') {
      this.deleteForm(index);
    } else {
      this.formCreateType = '';
      this.displayForm = false;
    }
  }

  setEditFormData(index: number) {
    const itemToBeEdited = this.individualMemberSignupStateService.listOfeducationCertification[index];
    this.FormDataToBeEdited = {
      id: itemToBeEdited.educationCertificationId,
      title: itemToBeEdited.courseCertificateTitle,
      university: itemToBeEdited.schoolOrUniversity,
      startDate: itemToBeEdited.workedDur.startDate,
      endDate: itemToBeEdited.workedDur.endDate,
      notYetPassedOut: itemToBeEdited.workedDur.curentlyWorkedHere,
      description: itemToBeEdited.descriptionOrFaculty
    }
  }

  deleteForm(index) {
    this.individualMemberSignupStateService.deleteEducationCertificationData(this.individualMemberSignupStateService.listOfeducationCertification[index].educationCertificationId)
  }

  formSubmissionDataHandler(formSubmission) {
    this.displayForm = false;
    if (formSubmission.submissionType !== 'close') {
      this.updateFormUsingAPI(formSubmission.formData);
    }
  }

  updateFormUsingAPI(formData: educationCertificationFormData) {
    let apiDatProcessing = {
      "educationCertificationId": formData.id,
      "courseCertificateTitle": formData.title,
      "schoolOrUniversity": formData.university,
      "workedDur": {
        "startDate": formData.startDate,
        "endDate": formData.endDate,
        "curentlyWorkedHere": formData.notYetPassedOut
      },
      "descriptionOrFaculty": formData.description
    }
        // put the data and make get api call
    this.individualMemberSignupStateService.setEducationCertificationData(apiDatProcessing);
  }

}
