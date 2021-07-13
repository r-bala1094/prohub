import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlSectionService } from '../../../services/control-section.service';

@Component({
  selector: 'prohub-basic-info-main',
  templateUrl: './basic-info-main.component.html',
  styleUrls: ['./basic-info-main.component.scss'],
})
export class BasicInfoMainComponent implements OnInit{
  @ViewChild('titleInfoComp') titleInfoComp;
  @ViewChild('expertsComp') expertsComp;
  @ViewChild('localExpertComp') localExpertComp;
  @ViewChild('categoriesComp') categoriesComp;
  @ViewChild('objectivesComp') objectivesComp;
  @ViewChild('descriptionComp') descriptionComp;
  @ViewChild('questionsComp') questionsComp;

  isSaved = false;

  constructor(private router: Router, private controlSectionService: ControlSectionService) {}

  ngOnInit() {
    this.controlSectionService.getBasicInfo().subscribe(val => {
      let data = val['response'].data
      if(data) {
        this.titleInfoComp.titleInfo.setValue({
          projectTitle: data.projectTitle,
          startDate: new Date(data.startDate),
          proposedCompletionDate: new Date(data.proposedCompletionDate),
          approxProposedDuration: '' + data.approxProposedDuration
        })
        this.expertsComp.expertInfo.setValue({
          selectExpert: data.expertWantToHire.single ? '1' : '2',
          numberOfExperts: data.expertWantToHire.numberOfExperts,
          hireConsultantAndMemberBoth: data.hireConsultantAndMemberBoth
        })
        this.localExpertComp.localExpertInfo.setValue({
          requireLocalExpert: data.requireLocalExpert,
          selectedCountry: '',
          selectedCity: ''
        })
        this.categoriesComp.categoriesInfo.patchValue({
          categoriesChipList: data.selectedCategory,
          subCategoriesChipList: data.selectedSubCategory,
          skillsChipList: data.selectedSkills
        })
        this.objectivesComp.objectivesInfo.patchValue({
          objectivesChipList: data.selectedObjectives,
          deliverablesChipList: data.addDeliverables
        })
        this.descriptionComp.descriptionInfo.patchValue({
          briefDescription: data.briefDescription,
          anyOtherRequirements: data.anyOtherRequirements
        })
        this.descriptionComp.filesList = data.files
        this.questionsComp.screeningInfo.patchValue({
          requireCoverLetterFromExperts: data.requireCoverLetterFromExperts,
        })
        data.questions.map(ques => {
          this.questionsComp.screeningInfo.controls.questions.push(
           new FormGroup({
            question: new FormControl(ques)
          })
        )
      })
    }
  }, (err: any)=> {
    console.log(err);
  })
}

  save() {
    this.isSaved = true;
    let basicInfo = {
      ...this.titleInfoComp.titleInfo.value,
      projectTitle: this.titleInfoComp.titleInfo.value.projectTitle,
      startDate: this.titleInfoComp.titleInfo.value.startDate?.toString(),
      proposedCompletionDate: this.titleInfoComp.titleInfo.value.proposedCompletionDate?.toString(),
      approxProposedDuration : Number(this.titleInfoComp.titleInfo.value.approxProposedDuration),
      expertWantToHire : {
        single: this.expertsComp.expertInfo.value.selectExpert === '1',
        multiple: this.expertsComp.expertInfo.value.selectExpert === '2',
        numberOfExperts: this.expertsComp.expertInfo.value.numberOfExperts,
      },
      hireConsultantAndMemberBoth: this.expertsComp.expertInfo.value.hireConsultantAndMemberBoth,
      requireLocalExpert: this.localExpertComp.localExpertInfo.value.requireLocalExpert,
      selectedCategory: this.categoriesComp.categoriesInfo.value.categoriesChipList,
      selectedSubCategory: this.categoriesComp.categoriesInfo.value.subCategoriesChipList,
      selectedSkills: this.categoriesComp.categoriesInfo.value.skillsChipList.map(val => {
        return {
          skillId: val.skillId,
          skill: val.skill
        }
      }),
      selectedObjectives: this.objectivesComp.objectivesInfo.value.objectivesChipList,
      addDeliverables: this.objectivesComp.objectivesInfo.value.deliverablesChipList,
      briefDescription: this.descriptionComp.descriptionInfo.value.briefDescription,
      anyOtherRequirements: this.descriptionComp.descriptionInfo.value.anyOtherRequirements,
      files: this.controlSectionService.filesListFromServer,
      requireCoverLetterFromExperts: this.questionsComp.screeningInfo.value.requireCoverLetterFromExperts,
      questions: this.questionsComp.screeningInfo.value.questions.map(ques => ques.question)
    };
    this.controlSectionService.updateBasicInfo(basicInfo)
  } 

  back() {}

  next() {
    this.save();
    this.router.navigateByUrl('/create-project/project-preference')
  }
}
