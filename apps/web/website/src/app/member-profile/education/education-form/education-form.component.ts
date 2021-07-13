import { IndividualMemberSignupComponent } from './../../../auth/signup/individual-member-signup/components/individual-member-signup/individual-member-signup.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';


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
  selector: 'prohub-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {

  @Input() formCreateType: string; // edit or create new form
  @Input() formValue: educationCertificationFormData; // if it is edit form, get data

  // formSubmissionData = {
  //   submissionType:
  //   formData:
  // }
  @Output() formSubmissionData = new EventEmitter();

  educationFormGroup: FormGroup;

  selectedUniversity: University = {
    universityName: "",
    universityState: "",
    universityLink: "",
    universityCountry: "",
    location: {
        lat: null,
        long: null
    },
    universityId: ""
  };


  filteredUniversity: [];

  constructor(private fb: FormBuilder, private individualMemberSignupStateService: IndividualMemberSignupStateService) { }

  ngOnInit(): void {
    if (this.formCreateType === 'new') {
      this.educationFormGroup = this.fb.group({
        title : ['', Validators.required],
        universityName: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: [''],
        notYetPassedOut: [false],
        description: ['']
      });
    } else if (this.formCreateType === 'edit') {
      this.educationFormGroup = this.fb.group({
        title : [this.formValue.title, Validators.required],
        universityName: [this.formValue.university.universityName, Validators.required],
        startDate: [this.dateExtractor(this.formValue.startDate), Validators.required],
        endDate: [this.dateExtractor(this.formValue.endDate)],
        notYetPassedOut: [this.formValue.notYetPassedOut],
        description: [this.formValue.description]
      });
    } else {
      this.educationFormGroup = this.fb.group({
        title : ['', Validators.required],
        universityName: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: [''],
        notYetPassedOut: [false],
        description: ['']
      });
    }

    this.educationFormGroup.get('universityName').valueChanges.subscribe((data: any) => {
      this.individualMemberSignupStateService.universitySearchWord = data;
      this.individualMemberSignupStateService.getListOfUniversity.subscribe(data => {
        this.filteredUniversity = data;
      });
    })
  }

  dateExtractor(date: Date) {
    return date ? new Date(date) : null;
  }

  // value => new, edit, close
  formSubmitHandler(value: string) {

    let outputData: { submissionType: string, formData: educationCertificationFormData } = {
      submissionType: value,
      formData: null,
    }

    if (value !== 'close') {
      outputData = {
        submissionType: value,
        formData: this.educationFormGroup.value,
      }
      outputData.formData.id = this.formCreateType === 'new' ? null : this.formValue.id;

      //  if there is no change is detected in university during edit, then assign old value to the output
      outputData.formData.university = this.formCreateType === 'edit' ?
      (this.selectedUniversity.universityName !== '' ? this.selectedUniversity : this.formValue.university)
      : this.selectedUniversity;
    }
    this.formSubmissionData.emit(outputData);
  }

  getUniversityText(university: any): string {
    if (university) {
      if (university.hasOwnProperty('universityName'))
        return university.universityName
      else
        return university
    } else
      return null;
  }

  handleUniversityChange(university) {
    this.selectedUniversity = university;
  }

}
