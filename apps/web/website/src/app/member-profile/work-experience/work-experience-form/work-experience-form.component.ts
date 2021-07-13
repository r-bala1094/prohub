import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';

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
  selector: 'prohub-work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.scss']
})
export class WorkExperienceFormComponent implements OnInit {

  @Input() formCreateType: string; // edit or create new form
  @Input() formValue: workExperienceFormData; // if it is edit form, get data from the parent

  // formSubmissionData = {
  //   submissionType:
  //   formData:
  // }
  @Output() formSubmissionData = new EventEmitter();

  workExperienceFormGroup: FormGroup;

  employmentTypes = [
    'Full Time',
    'Part Time',
    'Freelance',
    'Trainee'
  ];


  selectedAddress: location = {
    fullAddress: '',
    location: {
      lat: null,
      lng: null
    },
    name: '',
    locationId: ''
  };

  today: Date;

  filteredLocation: [];

  constructor(private fb: FormBuilder,
    private individualMemberSignupStateService: IndividualMemberSignupStateService) {
   }

  ngOnInit(): void {
    this.today = new Date();
    if (this.formCreateType === 'new') {
      this.workExperienceFormGroup = this.fb.group({
        title: ['', Validators.required],
        employmentType: ['', Validators.required],
        companyName: ['', Validators.required],
        companyFullAddress: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: [''],
        currentlyWorkingHere: [false],
        description: ['']
      });
    } else if (this.formCreateType === 'edit') {
      this.workExperienceFormGroup = this.fb.group({
        title: [this.formValue.title, Validators.required],
        employmentType: [this.formValue.employmentType, Validators.required],
        companyName: [this.formValue.companyName, Validators.required],
        companyFullAddress: [this.formValue.location.fullAddress, Validators.required],
        startDate: [this.dateExtractor(this.formValue.startDate), Validators.required],
        endDate: [this.dateExtractor(this.formValue.endDate)],
        currentlyWorkingHere: [this.formValue.currentlyWorkingHere],
        description: [this.formValue.description]
      });
    } else {
      this.workExperienceFormGroup = this.fb.group({
        title: ['', Validators.required],
        employmentType: ['', Validators.required],
        companyName: ['', Validators.required],
        companyFullAddress: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: [''],
        currentlyWorkingHere: [false],
        description: ['']
      });
    }

    this.workExperienceFormGroup.get('companyFullAddress').valueChanges.subscribe(data => {
      this.individualMemberSignupStateService.locationSearchWord = data;
      this.individualMemberSignupStateService.getListOfLocation.subscribe(data => {
        this.filteredLocation = data;
      });
    });
  }

  changedEmployeeType(value) {
    if (value !== 'notSelected') {
      this.workExperienceFormGroup.patchValue({employmentType: value});
    }
  }

  dateExtractor(date: Date) {
    return date ? new Date(date) : null;
  }

  // value => new, edit, close
  formSubmitHandler(value: string) {

    let outputData : { submissionType: string,formData: workExperienceFormData} = {
      submissionType: value,
      formData: null,
    }

    if (value !== 'close') {
      outputData = {
        submissionType: value,
        formData: this.workExperienceFormGroup.value,
      }

      if (outputData.formData.employmentType === this.employmentTypes[0]) {
        outputData.formData.employementTypeId = 1;
      } else if (outputData.formData.employmentType === this.employmentTypes[1]) {
        outputData.formData.employementTypeId = 2;
      } else if (outputData.formData.employmentType === this.employmentTypes[2]) {
        outputData.formData.employementTypeId = 3;
      } else {
        outputData.formData.employementTypeId = 4;
      }

      outputData.formData.id = this.formCreateType === 'new' ? null : this.formValue.id;
      outputData.formData.profileId = this.formCreateType === 'new' ? 1234 : this.formValue.profileId;

      //  if there is no change is detected in location during edit, then assign old value to the output
      outputData.formData.location = this.formCreateType === 'edit' ?
        (this.selectedAddress.fullAddress !== '' ? this.selectedAddress : this.formValue.location)
        : this.selectedAddress;
    }
    this.formSubmissionData.emit(outputData);
  }

  handleAddressChange(address) {
    this.selectedAddress = address;
  }

  getLocationText(location: any): string {
    if (location) {
      if (location.hasOwnProperty('fullAddress'))
        return location.fullAddress;
      else
        return location;
    } else
      return null;
  }

}
