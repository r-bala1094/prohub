import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';

interface Category {
  category: string,
  categoryId: number
}

interface SubCategory {
  categoryId: number,
  subCategory: string,
  subCategoryId: number
}
interface Skills {
  categoryId: number,
  subCategoryId: number,
  skill: string,
  skillId: number
}
@Component({
  selector: 'prohub-categories-and-skills',
  templateUrl: './categories-and-skills.component.html',
  styleUrls: ['./categories-and-skills.component.scss']
})
export class CategoriesAndSkillsComponent implements OnInit {

  // common variables for all three inputs
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // categories
  categoryCtrl = new FormControl();
  categoryEvent: Subscription;
  filteredCategories: Category[];
  selectedCategories: Category[] = [];

  // sub categories
  subCategoryCtrl = new FormControl();
  listOfSubCategories: SubCategory[];
  selectedSubCategories: SubCategory[] = [];
  filteredSubCategory: Observable<SubCategory[]>;

  // skills
  listOfSkills: Skills[] = [];
  skillsCtrl = new FormControl();
  selectedSkills: Skills[] = [];
  filteredSkills: Observable<Skills[]>;

  eventOccured: Boolean = false

  // categories
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;

  // sub categories
  @ViewChild('subCategoryInput') subCategoryInput: ElementRef<HTMLInputElement>;

  // skills
  @ViewChild('skillsInput') skillsInput: ElementRef<HTMLInputElement>;

  constructor(private individualMemberSignupStateService: IndividualMemberSignupStateService, private router: Router) {
    this.categoryCtrl.valueChanges.subscribe((input: any) => {
      this.individualMemberSignupStateService.categorySearchWord = input;
      // if user selected from drop down, that one also added as a value change event
      // hence it will make a subscription. We are setting '' in selected function after user selects from drown down.Hence we are unsubscribing any subscription when setting the value ''
      if (this.eventOccured && input === '') {
        this.categoryEvent.unsubscribe();
      }
      this.categoryEvent = this.individualMemberSignupStateService.getListOfCategories.subscribe(
        data => {
          this.eventOccured = true;
          this.filteredCategories = data;
        }
      )
    });
  }

  ngOnInit() {
    this.filteredCategories = this.individualMemberSignupStateService.allCategories;
    if (this.individualMemberSignupStateService.selectedCategories.length > 0) {
      this.selectedCategories = this.individualMemberSignupStateService.selectedCategories;
      this.selectedSubCategories = this.individualMemberSignupStateService.selectedSubCategories;
      this.selectedSkills = this.individualMemberSignupStateService.selectedSkills;
      this.getSkills();
      this.getSubCategory();
    } else {
      this.individualMemberSignupStateService.getListOfSelectedCategoriesAndSkills.subscribe(
        (data: any) => {
          if (data !== null) {
            this.selectedCategories = data.categories;
            this.selectedSubCategories = data.subCategories;
            this.selectedSkills = data.skills;
            this.getSkills();
            this.getSubCategory();
          } else {
            this.selectedCategories = [];
            this.selectedSubCategories = [];
            this.selectedSkills = [];
          }
        }
      )
    }
    localStorage.removeItem('memberSignupCurrentTab');
  }

  // categories
  remove(category: Category): void {
    const index = this.selectedCategories.findIndex(element =>
      element.categoryId === category.categoryId
    );
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }
    this.getSubCategory();
    this.categoryCtrl.setValue('');
    if (this.selectedSubCategories.length > 0) {
      this.selectedSubCategories =
        this.removeItemsBasedOnId(category.categoryId, 'categoryId', this.selectedSubCategories);
    }
    if (this.selectedSkills.length > 0) {
      this.selectedSkills = this.removeItemsBasedOnId(category.categoryId, 'categoryId', this.selectedSkills);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const findCategoryObject: Category = this.filteredCategories.find(element =>
      element.category === event.option.viewValue
    );

    const foundDuplicate = this.selectedCategories.some(element =>
      element.categoryId === findCategoryObject.categoryId
    );

    if (!foundDuplicate) {
      this.selectedCategories.push(findCategoryObject);
      this.categoryInput.nativeElement.value = '';
      this.getSubCategory();
      this.categoryCtrl.setValue('');
    }
  }

  // sub categories -  fetch list of sub categories as soon as user selects category
  getSubCategory() {
    this.individualMemberSignupStateService.selectedCategories = this.selectedCategories;
    this.individualMemberSignupStateService.getListOfSubCategories.subscribe(
      data => {
        this.listOfSubCategories = data;
      });
  }

  removeSubCategory(subCategory: SubCategory): void {
    const index = this.selectedSubCategories.findIndex(element =>
      element.subCategoryId === subCategory.subCategoryId
    );
     if (index >= 0) {
       this.selectedSubCategories.splice(index, 1);
       this.getSkills();
     }
    this.subCategoryCtrl.setValue('');

    if(this.selectedSkills.length > 0)
      this.selectedSkills = this.removeItemsBasedOnId(subCategory.subCategoryId, 'subCategoryId', this.selectedSkills);
  }

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
      this.subCategoryCtrl.setValue('');
      this.getSkills();
    }
  }

  // get skills - fetch list of skills as soon as user selects sub category
  getSkills() {
    this.individualMemberSignupStateService.selectedSubCategories = this.selectedSubCategories;
    this.individualMemberSignupStateService.getListOfSkills.subscribe(
      data => this.listOfSkills = data
    );
  }

  removeSkill(skill: Skills): void {
    const index = this.selectedSkills.findIndex(element =>
      element.skill === skill.skill
    );
     if (index >= 0) {
       this.selectedSkills.splice(index, 1);
     }
    this.skillsCtrl.setValue('');
    this.individualMemberSignupStateService.selectedSkills = this.selectedSkills;
  }

  selectedSkill(event: MatAutocompleteSelectedEvent): void {

    const findSkillObject: Skills = this.listOfSkills.find(element =>
      element.skill === event.option.viewValue
    );

    const foundDuplicate = this.selectedSkills.some(element =>
      element.skillId === findSkillObject.skillId
    );

    if (!foundDuplicate) {
      this.selectedSkills.push(findSkillObject);
      this.skillsInput.nativeElement.value = '';
      this.skillsCtrl.setValue('');
    }

    this.individualMemberSignupStateService.selectedSkills = this.selectedSkills;
  }

  removeItemsBasedOnId(id , key, array) {
    return array.filter(subCategory => subCategory[key] !== id)
  }

  handleMovePage(buttonType: string) {
    const url = buttonType === 'back' ?
        'education'
      : 'project-services';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/' + url);
    const body = {
      categories: this.selectedCategories,
      subCategories: this.selectedSubCategories,
      skills: this.selectedSkills
    };
    this.individualMemberSignupStateService.setListOfSelectedCategoriesAndSkills(body);
  }

}
