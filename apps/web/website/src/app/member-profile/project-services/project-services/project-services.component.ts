import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';
import { Router } from '@angular/router';

interface Category {
  category: string,
  categoryId: number
}

interface SubCategory {
  categoryId: number,
  subCategory: string,
  subCategoryId: number
}

interface fileUploadServerResponse {
  ETag: string,
  Location: string,
  key: string,
  Bucket: string,
  originalName: string
}

interface projectServicesFormData {
  projectAndServiceId: number,
  projectAndServiceTitle: string,
  categories: Category,
  subCategories: SubCategory[],
  startDate: Date,
  endDate: Date,
  currentlyWorkingHere: boolean,
  uploadedFiles: fileUploadServerResponse[]
}

@Component({
  selector: 'prohub-project-services',
  templateUrl: './project-services.component.html',
  styleUrls: ['./project-services.component.scss']
})
export class ProjectServicesComponent implements OnInit {

  @Output() moveThePage = new EventEmitter();

  displayForm: boolean = false;
  formCreateType: string;

  FormDataToBeEdited: projectServicesFormData;

  constructor(
    public individualMemberSignupStateService: IndividualMemberSignupStateService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  projectServicesFormGroup: FormGroup;

  ngOnInit(): void {
    this.individualMemberSignupStateService.getAllProjectServicesData.subscribe();
  }

  // navigates to and fro between the pages
  handleMovePage(buttonType: string) {
    const url = buttonType === 'back' ?
        'categories'
      : 'intro-video';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/' + url);
  }

  // depending on user action, show the form to fill/edit/close the form
  formUpdateHandler(action: string, index: number) {
    if (action === 'createNewForm') {
      this.formCreateType = 'new';
      this.displayForm = true;
    } else if (action === 'close') {
      this.formCreateType = 'close';
      this.displayForm = false;
    } else if (action === 'edit') {
      this.setEditFormData(index);
    } else if (action === 'delete') {
      this.deleteForm(index);
    } else {
      this.formCreateType = '';
      this.displayForm = false;
    }
  }

  //set the input data for the form
  setEditFormData(index: number) {

    this.individualMemberSignupStateService.getProjectServicesDataByIdValue = this.individualMemberSignupStateService.listAllOfProjectServices[index].projectAndServiceId;
    this.individualMemberSignupStateService.getProjectServicesDataById.subscribe(
      (data: any) => {
        // form always expects array of size 3
        let uploadFiles = [];
        if(data.hasOwnProperty('uploadedFiles')) {
          for (let i = 0; i < 3; i++) {
            if (data.uploadedFiles[i]) {
              uploadFiles[i] = data.uploadedFiles[i]
            } else {
              uploadFiles[i] = {};
            }
          }
        } else {
          uploadFiles =  new Array(3).fill({});
        }
        this.FormDataToBeEdited = {
          projectAndServiceId: data.projectAndServiceId,
          projectAndServiceTitle: data.projectAndServiceTitle,
          categories: data.categories,
          subCategories: data.subCategories,
          startDate: data.projectDuration.startDate,
          endDate: data.projectDuration.endDate,
          currentlyWorkingHere: data.projectDuration.currentlyWorkingHere,
          uploadedFiles: uploadFiles
        }
        this.formCreateType = 'edit';
        this.displayForm = true;
      }
    )
  }

  //delete project from the list
  deleteForm(index) {
    this.individualMemberSignupStateService.deleteProjectServicesData(this.individualMemberSignupStateService.listAllOfProjectServices[index].projectAndServiceId)
  }

  // adding the form to the list of projects through API
  formSubmissionDataHandler(formSubmission) {
    this.displayForm = false;
    if (formSubmission.submissionType !== 'close') {
      this.updateFormUsingAPI(formSubmission.formData);
    }
  }

  // data processing before sending to API
  updateFormUsingAPI(formData: projectServicesFormData) {
    let apiDatProcessing = {
      "projectAndServiceId": formData.projectAndServiceId,
      "projectAndServiceTitle": formData.projectAndServiceTitle,
      "categories": formData.categories,
      "subCategories": formData.subCategories,
      "projectDuration": {
        "startDate": formData.startDate,
        "endDate": formData.endDate,
        "currentlyWorkingHere": formData.currentlyWorkingHere
      },
      "uploadedFiles": formData.uploadedFiles
    }
    this.individualMemberSignupStateService.setAllProjectServicesData(apiDatProcessing);
  }

}
