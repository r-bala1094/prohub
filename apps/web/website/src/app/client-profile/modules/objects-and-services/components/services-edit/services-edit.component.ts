import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { WebCommonService } from 'apps/web/website/src/app/services/web-common.service';
import { ClientProfileService } from '../../../../services/client-profile.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'prohub-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.scss']
})
export class ServicesEditComponent implements OnInit {

  categoriesInfo : FormGroup;
  categories = [];
  categoriesResponse = [];
  selectedCategoryIds = [];
  selectedCategoryResponse = [];
  subCategories = [];
  subCategoriesResponse = [];
  selectedSubCategoryIds = [];
  selectedSubCategoryResponse = [];
  skills = [];
  skillsResponse = [];
  selectedSkillsResponse = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filterCategories: Observable<string[]>;
  filterSubCategories: Observable<string[]>;
  filterSkills: Observable<string[]>;
  @Input('details') details;
  @Output() toggleEditMode = new EventEmitter<any>();
  @ViewChild('categoryInputCtrl') categoryInputCtrl: ElementRef<HTMLInputElement>;
  @ViewChild('subCategoryInputCtrl') subCategoryInputCtrl: ElementRef<HTMLInputElement>;
  @ViewChild('skillInputCtrl') skillInputCtrl: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private commonService: WebCommonService,
    private clientService: ClientProfileService
  ) {
    this.categoriesInfo = this.fb.group({
      categoriesChipList: [''],
      categoryInput: [''],
      subCategoriesChipList: [''],
      subCategoryInput: [''],
      skillsChipList: [''],
      skillInput: ['']
    });
  }

  ngOnInit(): void {
    this.getCategoriesList()
  }

  getCategoriesList() {
    this.categoriesResponse = [];
    this.categories = [];
    this.commonService.getCategoriesList('', null).subscribe((res: any) => {
      if (res.response && res.response.data) {
        this.categoriesResponse = res.response.data;
        this.categoriesResponse.forEach(value => {
          this.categories.push(value.category);
        });
        this.filterCategories = this.categoriesInfo.controls['categoryInput'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.categories))
        );
      }
    });
  }

  getSubCategoriesList() {
    this.subCategories = [];
    this.subCategoriesResponse = [];
    this.commonService.getSubCategoriesList(this.selectedCategoryIds, null).subscribe((res: any) => {
      if (res.response && res.response.data) {
        this.subCategoriesResponse = res.response.data;
        this.subCategoriesResponse.forEach(value => {
          this.subCategories.push(value.subCategory);
        });
        this.filterSubCategories = this.categoriesInfo.controls['subCategoryInput'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.subCategories))
        );
      }
    });
  }

  getSkillsList() {
    this.skills = [];
    this.skillsResponse = [];
    this.commonService.getSkillsList(this.selectedCategoryIds, this.selectedSubCategoryIds, '', null).subscribe((res: any) => {
      if (res.response && res.response.data) {
        this.skillsResponse = res.response.data;
        this.skillsResponse.forEach(value => {
          this.skills.push(value.skill);
        });
        this.filterSkills = this.categoriesInfo.controls['skillInput'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.skills))
        );
      }
    });
  }

  ngOnChanges() {
    if (this.details) {
      this.setData();
    }
  }

  setData() {
    this.selectedCategoryResponse = this.details.categories;
    this.selectedSubCategoryResponse = this.details.subCategories;
    this.selectedSkillsResponse = this.details.skills;
    const selectedCategories = [];
    const selectedSubCategories = [];
    const selectedSkills = [];
    this.selectedCategoryResponse.forEach(data => {
      this.selectedCategoryIds.push(data.categoryId);
      selectedCategories.push(data.category);
    });
    this.selectedSubCategoryResponse.forEach(data => {
      this.selectedSubCategoryIds.push(data.subCategoryId);
      selectedSubCategories.push(data.subCategory);
    });
    this.selectedSkillsResponse.forEach(data => {
      selectedSkills.push(data.skill);
    });
    this.categoriesInfo.patchValue({
      categoriesChipList: [...selectedCategories],
      categoryInput: '',
      subCategoriesChipList: [...selectedSubCategories],
      subCategoryInput: '',
      skillsChipList: [...selectedSkills],
      skillInput: ''
    });
    this.getSubCategoriesList();
    this.getSkillsList();
  }

  removeCategory(category) {
    const index = this.categoriesChipList.value.indexOf(category);
    if (index >= 0) {
      this.categoriesChipList.value.splice(index, 1);
    }
    const categoryId = this.selectedCategoryResponse.filter(data => data.category === category)[0].categoryId;
    this.selectedCategoryResponse.splice(
      this.selectedCategoryResponse.findIndex(data => data.category === category), 1
    );
    this.selectedCategoryIds.splice(
      this.selectedCategoryIds.findIndex(data => data === categoryId), 1
    );
    this.getSubCategoriesList();
    this.selectedSubCategoryResponse.forEach((sub, index) => {
      if (sub.categoryId === categoryId) {
        this.selectedSubCategoryResponse.splice(index, 1);
      }
    });
    let updatedSubCategoriesChipList = [];
    this.subCategoriesChipList.value.length = 0;
    this.selectedSubCategoryIds = [];
    this.selectedSubCategoryResponse.forEach(data => {
      updatedSubCategoriesChipList.push(data.subCategory);
      this.selectedSubCategoryIds.push(data.subCategoryId)
    });
    this.getSkillsList();
    this.selectedSkillsResponse.forEach((skill, index) => {
      if (skill.categoryId === categoryId) {
        this.selectedSkillsResponse.splice(index, 1);
      }
    });
    let updatedSkillsChipList = [];
    this.skillsChipList.value.length = 0;

    this.selectedSkillsResponse.forEach(data => {
      updatedSkillsChipList.push(data.skill);
    });
    this.categoriesInfo.patchValue({
      categoriesChipList: [...this.categoriesChipList.value],
      categoryInput: '',
      subCategoriesChipList: [...updatedSubCategoriesChipList],
      subCategoryInput: '',
      skillsChipList: [...updatedSkillsChipList],
      skillInput: ''
    });
    if(this.categoriesChipList.value.length < 1) {
      this.skillsChipList.value.length = 0;
      this.subCategoriesChipList.value.length = 0;
    }
  }

  removeSubCategory(subCategory) {
    const index = this.subCategoriesChipList.value.indexOf(subCategory);
    if (index >= 0) {
      this.subCategoriesChipList.value.splice(index, 1);
    }
    const subCategoryId = this.selectedSubCategoryResponse.filter(data => data.subCategory === subCategory)[0].subCategoryId;
    this.selectedSubCategoryResponse.splice(
      this.selectedSubCategoryResponse.findIndex(data => data.subCategory === subCategory), 1
    );
    this.selectedSubCategoryIds.splice(
      this.selectedSubCategoryIds.findIndex(data => data === subCategoryId), 1
    );
    this.getSkillsList();
    this.selectedSkillsResponse.forEach((skill, index) => {
      if (skill.subCategoryId === subCategoryId) {
        this.selectedSkillsResponse.splice(index, 1);
      }
    });
    let updatedSkillsChipList = [];
    this.skillsChipList.value.length = 0;

    this.selectedSkillsResponse.forEach(data => {
      updatedSkillsChipList.push(data.skill);
    });
    this.categoriesInfo.patchValue({
      subCategoriesChipList: [...this.subCategoriesChipList.value],
      subCategoryInput: '',
      skillsChipList: [...updatedSkillsChipList],
      skillInput: ''
    });
    if(this.subCategoriesChipList.value.length < 1) {
      this.skillsChipList.value.length = 0;
    }
  }

  removeSkill(skill) {
    const index = this.skillsChipList.value.indexOf(skill);
    if (index >= 0) {
      this.skillsChipList.value.splice(index, 1);
    }
    this.categoriesInfo.patchValue({
      skillsChipList: [...this.skillsChipList.value],
      skillInput: ''
    });
    this.selectedSkillsResponse.splice(
      this.selectedSkillsResponse.findIndex(data => data.skill === skill), 1
    );
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    let index = this.categoriesChipList.value.indexOf(event.option.viewValue);
    if(index == -1){
      this.categoriesInfo.patchValue({
        categoriesChipList: [...this.categoriesChipList.value, event.option.value],
        categoryInput: ''
      });
    }
    this.categoriesInfo.controls['categoryInput'].setValue('');
    this.categoryInputCtrl.nativeElement.value = '';
    const fileteredCategory = this.categoriesResponse.filter(data => data.category === event.option.value)[0];
    this.selectedCategoryIds.push(fileteredCategory.categoryId);
    this.selectedCategoryResponse.push(fileteredCategory);
    this.getSubCategoriesList();
  }

  selectedSubCategory(event: MatAutocompleteSelectedEvent): void {
    let index = this.subCategoriesChipList.value.indexOf(event.option.viewValue);
    if(index == -1){
      this.categoriesInfo.patchValue({
        subCategoriesChipList: [...this.subCategoriesChipList.value, event.option.value],
        subCategoryInput: ''
      });
    }
    this.categoriesInfo.controls['subCategoryInput'].setValue('');
    this.subCategoryInputCtrl.nativeElement.value = '';
    const filteredSubCategory = this.subCategoriesResponse.filter(data => data.subCategory === event.option.value)[0];
    this.selectedSubCategoryIds.push(filteredSubCategory.subCategoryId);
    this.selectedSubCategoryResponse.push(filteredSubCategory);
    this.getSkillsList();
  }

  selectedSkill(event: MatAutocompleteSelectedEvent): void {
    let index = this.skillsChipList.value.indexOf(event.option.viewValue);
    if(index == -1){
      this.categoriesInfo.patchValue({
        skillsChipList: [...this.skillsChipList.value, event.option.value],
        skillInput: ''
      });
    }
    this.categoriesInfo.controls['skillInput'].setValue('');
    this.skillInputCtrl.nativeElement.value = '';
    this.selectedSkillsResponse.push(
      this.skillsResponse.filter(data => data.skill === event.option.value)[0]
    );
  }

  get categoriesChipList() {
    return this.categoriesInfo.get('categoriesChipList');
  }

  get subCategoriesChipList() {
    return this.categoriesInfo.get('subCategoriesChipList');
  }

  get skillsChipList() {
    return this.categoriesInfo.get('skillsChipList');
  }

  onUpdateClick() {
    const resultData = {
      categories: this.selectedCategoryResponse,
      subCategories: this.selectedSubCategoryResponse,
      skills: this.selectedSkillsResponse
    };
    this.clientService.putServices(resultData).subscribe((res:any) => {
      this.toggleEditMode.emit();   
    },(err: any)=> {
      console.log(err);
    });
  }

  onCancelClick() {
    this.toggleEditMode.emit();
  }

  private _filter(value, arrayToFilter): string[] {
    const filterValue = value.toLowerCase();
    return arrayToFilter.filter(option => option.toLowerCase().includes(filterValue));
  }

}
