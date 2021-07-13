import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ControlSectionService } from '../../../../create-project/services/control-section.service';

@Component({
  selector: 'prohub-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredcategories: Observable<any[]>;
  filteredSubcategories: Observable<any[]>;
  filteredSkills: Observable<any[]>;
  allcategories = [];
  allsubcategories = [];
  allskills = [];
  suggestedCategories = [];

  categoriesInfo = new FormGroup({
    categoriesChipList: new FormControl([], Validators.required),
    categoryInput: new FormControl(),
    subCategoriesChipList: new FormControl([], Validators.required),
    subcategoryInput: new FormControl(),
    skillsChipList: new FormControl([], Validators.required),
    skillsInput: new FormControl()
  })
  
  constructor(private controlSectionService : ControlSectionService) {
    this.filteredcategories = this.categoriesInfo.get('categoryInput').valueChanges.pipe(
        startWith(null),
        map((category) => category ? this._filter(category, this.allcategories) : this.allcategories.slice()));

    this.filteredSubcategories = this.categoriesInfo.get('subcategoryInput').valueChanges.pipe(
      startWith(null),
      map((subcategory) => subcategory ? this._filter(subcategory, this.allsubcategories) : this.allsubcategories.slice()));

    this.filteredSkills = this.categoriesInfo.get('skillsInput').valueChanges.pipe(
      startWith(null),
      map((skill) => skill ? this._filter(skill, this.allskills) : this.allskills.slice()));
  }
      
  ngOnInit() {
    this.controlSectionService.getListOfCategories().subscribe(res => {
      this.allcategories = res['response'].data;
      this.filteredcategories = of(this.allcategories)
    }, (err: any)=> {
      console.log(err);
    })
    
    this.suggestedCategories = ['Architecture & Engineering > 3d Architecture', 'Architecture & Engineering > Landscape Designing', 'Architecture & Engineering > 2d & 3d Rendering']

    this.categoriesChipList.valueChanges.subscribe(data => {
      this.controlSectionService.getListOfSubCategories(data.map(cat => cat.categoryId)).subscribe(res => {
        this.allsubcategories = res['response'].data;
        this.filteredSubcategories = of(this.allsubcategories);
      }, (err: any)=> {
        console.log(err);
      })
      this.controlSectionService.getListOfSkills(data.map(cat => cat.categoryId), this.subCategoriesChipList.value.map(subcat => subcat.subCategoryId)).subscribe(res => {
        this.allskills = res['response'].data;
        this.filteredSkills = of(this.allskills)
      }, (err: any)=> {
        console.log(err);
      })
    })

    this.subCategoriesChipList.valueChanges.subscribe(data => {
      this.controlSectionService.getListOfSkills(this.categoriesChipList.value.map(cat => cat.categoryId), data.map(subcat => subcat.subCategoryId)).subscribe(res => {
        this.allskills = res['response'].data;
        this.filteredSkills = of(this.allskills)
      }, (err: any)=> {
        console.log(err);
      })
    })
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

  removeCategory(category: string): void {
    const index = this.categoriesChipList.value.indexOf(category);

    if (index >= 0) {
      this.categoriesChipList.value.splice(index, 1);
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    this.categoriesInfo.patchValue({
      categoriesChipList: [...this.categoriesChipList.value, event.option.value],
      categoryInput: ''
    });
  }

  removeSubCategory(subcategory: string): void {
    const index = this.subCategoriesChipList.value.indexOf(subcategory);

    if (index >= 0) {
      this.subCategoriesChipList.value.splice(index, 1);
    }
  }

  selectedSubCategory(event: MatAutocompleteSelectedEvent): void {
    this.categoriesInfo.patchValue({
      subCategoriesChipList: [...this.subCategoriesChipList.value, event.option.value],
      subcategoryInput: ''
    });
  }

  removeSkill(skill: string): void {
    const index = this.skillsChipList.value.indexOf(skill);

    if (index >= 0) {
      this.skillsChipList.value.splice(index, 1);
    }
  }

  selectedSkill(event: MatAutocompleteSelectedEvent): void {
    this.categoriesInfo.patchValue({
      skillsChipList: [...this.skillsChipList.value, event.option.value],
      skillsInput: ''
    });
  }

  private _filter(value, arrayToFilter) {
    const filterValue = value.toLowerCase();

    return arrayToFilter.filter(val => val.toLowerCase().indexOf(filterValue) === 0);
  }

}
