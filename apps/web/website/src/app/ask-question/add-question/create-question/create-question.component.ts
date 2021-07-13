
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginService } from './../../../auth/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlserviceService } from './../../services/controlservice.service';
  
@Component({
  selector: 'prohub-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})

export class CreateQuestionComponent implements OnInit{
  @ViewChild('categoriesComp') categoriesComp;
  @ViewChild('questionComp') questionComp;
  @ViewChild('localExpertComp') localExpertComp;
  
  successfull: boolean = false;

  constructor(
    private ControlserviceService : ControlserviceService,
    private router: Router,
    private LoginService: LoginService,
  ) { }
      
  ngOnInit() {
      this.LoginService.isLoggedIn();
      console.log(this.LoginService.isLoggedIn())

  }
 

  save() {
    let detail = {
    title: this.questionComp.titleForm.value.title,
    description: this.questionComp.titleForm.value.description,
    requireLocalExpert: this.localExpertComp.localExpertInfo.value.requireLocalExpert,
    selectedCountry: this.localExpertComp.localExpertInfo.value.selectedCountry,
    selectedCity: this.localExpertComp.localExpertInfo.value.selectedCity,
    selectedCategory: this.categoriesComp.categoriesInfo.value.categoriesChipList,
    selectedSubCategory: this.categoriesComp.categoriesInfo.value.subCategoriesChipList,
    selectedSkills: this.categoriesComp.categoriesInfo.value.skillsChipList.map(val => {
      return {
        skillId: val.skillId,
        skill: val.skill
      }}),
    }

    this.ControlserviceService.addquestion(detail);
    this.successfull = true;

    if ( this.LoginService.isLoggedIn() === false ) {
      this.router.navigate(['/ask-question/create/success'])
    }

  }


}

