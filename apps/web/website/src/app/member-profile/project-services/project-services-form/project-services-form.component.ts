import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, Input , ElementRef, ViewChild} from '@angular/core';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';


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
  selector: 'prohub-project-services-form',
  templateUrl: './project-services-form.component.html',
  styleUrls: ['./project-services-form.component.scss']
})
export class ProjectServicesFormComponent implements OnInit {

  @Input() formCreateType: string; // edit or create new form
  @Input() formValue: projectServicesFormData; // if it is edit form, get data from the parent using formValue

  @Output() formSubmissionData = new EventEmitter();

  // sub categories
  @ViewChild('subCategoryInput') subCategoryInput: ElementRef<HTMLInputElement>;

  projectServiceFormGroup: FormGroup;

  today: Date;

  selectedCategories: Category[];

  // fetched from categories and skills
  listOfCategories: Category[];
  // sub categories
  listOfSubCategories: SubCategory[] = [];

  selectedSubCategories: SubCategory[] = [];
  filteredSubCategory: Observable<SubCategory[]>;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // attachments
  listOfFiles = new Array(3).fill({});

  constructor(private fb: FormBuilder,
    private individualMemberSignupStateService: IndividualMemberSignupStateService) {
      this.getSelectedCategoriesAndSubCategories();
   }

  ngOnInit(): void {
    this.today = new Date();
    if (this.formCreateType === 'new') {
      this.projectServiceFormGroup = this.fb.group({
        projectAndServiceTitle: ['', Validators.required],
        categories: ['', Validators.required],
        subCategories: ['',],
        startDate: ['', Validators.required],
        endDate: [''],
        currentlyWorkingHere: [false],
        uploadedFiles: ['']
      });
    } else if (this.formCreateType === 'edit') {
      this.projectServiceFormGroup = this.fb.group({
        projectAndServiceTitle: [this.formValue.projectAndServiceTitle, Validators.required],
        categories: [this.formValue.categories, Validators.required],
        subCategories: [this.formValue.subCategories],
        startDate: [this.dateExtractor(this.formValue.startDate), Validators.required],
        endDate: [this.dateExtractor(this.formValue.endDate)],
        currentlyWorkingHere: [this.formValue.currentlyWorkingHere],
        uploadedFiles: [this.formValue.uploadedFiles]
      });
      this.listOfFiles = this.formValue.uploadedFiles;
      this.selectedSubCategories = this.formValue.subCategories;
    } else {
      this.projectServiceFormGroup = this.fb.group({
        projectAndServiceTitle: ['', Validators.required],
        categories: ['', Validators.required],
        subCategories: [''],
        startDate: ['', Validators.required],
        endDate: [''],
        currentlyWorkingHere: [false],
        uploadedFiles: ['']
      });
    }
  }

  // used for loading default value in edit mode
  compareFn(op1: Category, op2: Category) {
    // if (this.formCreateType === 'new')
    //   return false;
    return op1.categoryId === op2.categoryId;
  }

  dateExtractor(date: Date) {
    return date ? new Date(date) : null;
  }

  deleteFile(index) {
    this.listOfFiles[index] = {};
  }

  // value => new, edit, close
  formSubmitHandler(value: string) {

    let outputData : { submissionType: string,formData: projectServicesFormData} = {
      submissionType: value,
      formData: null,
    }

    if (value !== 'close') {
      outputData = {
        submissionType: value,
        formData: this.projectServiceFormGroup.value,
      }

      const uploadFileArray = this.listOfFiles.reduce(
        (acc, value) => {
          if(Object.keys(value).length > 0)
            acc.push(value)
          return acc;
        }
        , [])

      outputData.formData.projectAndServiceId = this.formCreateType === 'new' ?
        null : this.formValue.projectAndServiceId;
      outputData.formData.uploadedFiles = uploadFileArray;
    }
    this.formSubmissionData.emit(outputData);
  }

  // fetch the data which was selected in categories and skills
  getSelectedCategoriesAndSubCategories() {
    if (this.individualMemberSignupStateService.selectedCategories.length > 0) {
      this.listOfCategories = this.individualMemberSignupStateService.selectedCategories;
      this.listOfSubCategories = this.individualMemberSignupStateService.selectedSubCategories;
    } else {
      this.individualMemberSignupStateService.getListOfSelectedCategoriesAndSkills.subscribe(
        (data: any) => {
          if (data !== null) {
            this.listOfCategories = data.categories;
            this.listOfSubCategories = data.subCategories;
          } else {
            this.listOfCategories = [];
            this.listOfSubCategories = [];
          }
        }
      )
    }
  }

  handleUpload(files, index) {
    const i = index;
    this.individualMemberSignupStateService.uploadProjectAttachment(files[0]).subscribe(
      (data: any) => this.listOfFiles[i] = data.response.data
    )
  }

  // add to selected sub category as user selects chips in sub category field
  selectedSubCategory(event: MatAutocompleteSelectedEvent): void {

    const findSubCategoryObject: SubCategory = this.listOfSubCategories.find(element =>
      element.subCategory === event.option.viewValue
    );

    const foundDuplicate = this.selectedSubCategories.some(element =>
      element.subCategoryId === findSubCategoryObject.subCategoryId
    );

    if (!foundDuplicate) {
      this.selectedSubCategories.push(findSubCategoryObject);
      this.subCategoryInput.nativeElement.value = '';
      this.projectServiceFormGroup.patchValue({ 'subCategories' : this.selectedSubCategories});
    }
  }

  removeSubCategory(subCategory: SubCategory): void {
    const index = this.selectedSubCategories.findIndex(element =>
      element.subCategoryId === subCategory.subCategoryId
    );
    if (index >= 0) {
      this.selectedSubCategories.splice(index, 1);
    }
    this.projectServiceFormGroup.patchValue({ 'subCategories': '' });
  }

  resetSelectedSubCategories() {
    this.selectedSubCategories = [];
  }

  disableForm() {
    return (!this.projectServiceFormGroup.valid || (this.selectedSubCategories.length < 1));
  }
}
