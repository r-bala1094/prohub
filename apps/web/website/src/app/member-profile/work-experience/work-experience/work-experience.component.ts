import { FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';
import { Router } from '@angular/router';

interface location {
  fullAddress: String,
  location: {
    lat: Number,
    lng: Number
  },
  name: String,
  locationId: String
}

interface workExperienceFormData {
  id: number,
  title: string,
  employmentType: string,
  employementTypeId: number,
  companyName: string,
  location: location,
  startDate: Date,
  endDate: Date,
  currentlyWorkingHere: boolean,
  description: string,
  profileId: number
}

@Component({
  selector: 'prohub-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {


  displayForm: boolean = false;
  formCreateType: string;

  FormDataToBeEdited: workExperienceFormData;

  workExperienceFormGroup = this.fb.group({
    title : ['', Validators.required],
    employmentType: ['', Validators.required],
    companyName: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    description: ['']
  });

  employmentTypes = [
    'Full Time',
    'Part Time',
    'Freelance',
    'Trainee'
  ]

  constructor(
    public individualMemberSignupStateService: IndividualMemberSignupStateService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.individualMemberSignupStateService.getWorkExperience.subscribe();
  }

  handleMovePage(buttonType: string) {
    const url = buttonType === 'back' ?
        'about-me'
      : 'education';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

  // decides whether to show form or not based on close button and plus icon
  formUpdateHandler(action: string, index: number) {
    if (action === 'createNewForm') {
      this.formCreateType = 'new';
      this.displayForm = true;
    } else if (action === 'close') {
      this.formCreateType = 'close';
      this.displayForm = false;
    } else if (action === 'edit') {
      this.setEditFormData(index);
      this.formCreateType = 'edit';
      this.displayForm = true;
    } else if (action === 'delete') {
      this.deleteForm(index);
    } else {
      this.formCreateType = '';
      this.displayForm = false;
    }
  }

  setEditFormData(index: number) {
    const itemToBeEdited = this.individualMemberSignupStateService.listOfWorkExperiences[index];
    this.FormDataToBeEdited = {
      id: itemToBeEdited.workExperienceId,
      title: itemToBeEdited.title,
      employmentType: itemToBeEdited.employementType.employementType,
      employementTypeId: itemToBeEdited.employementType.employementTypeId,
      companyName: itemToBeEdited.companyName,
      location: itemToBeEdited.location,
      startDate: itemToBeEdited.workedDur.startDate,
      endDate: itemToBeEdited.workedDur.endDate,
      currentlyWorkingHere: itemToBeEdited.workedDur.curentlyWorkedHere,
      description: itemToBeEdited.description,
      profileId: itemToBeEdited.profileId
    }
  }

  deleteForm(index) {
    this.individualMemberSignupStateService.deleteWorkExperience(this.individualMemberSignupStateService.listOfWorkExperiences[index].workExperienceId);
  }

  formSubmissionDataHandler(formSubmission) {
    this.displayForm = false;
    if (formSubmission.submissionType !== 'close') {
      this.updateFormUsingAPI(formSubmission.formData);
    }
  }

  changedEmployeeType(value) {
    if (value !== 'notSelected') {
      this.workExperienceFormGroup.patchValue({employmentType: value});
    }
  }

  updateFormUsingAPI(formData: workExperienceFormData) {
    let apiDatProcessing = {
      "workExperienceId": formData.id,
      "title": formData.title,
      "employementType": {
          "employementTypeId": formData.employementTypeId,
          "employementType": formData.employmentType
      },
      "companyName": formData.companyName,
      "location": formData.location,
      "workedDur": {
          "startDate": formData.startDate,
          "endDate": formData.endDate,
          "curentlyWorkedHere": formData.currentlyWorkingHere
      },
      "description": formData.description
    }
    // put the data and make get api call
    this.individualMemberSignupStateService.setWorkExperience(apiDatProcessing);
  }

}
