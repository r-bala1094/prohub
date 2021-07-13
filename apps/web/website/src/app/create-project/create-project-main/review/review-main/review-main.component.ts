import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlSectionService } from '../../../services/control-section.service';

@Component({
  selector: 'prohub-review-main',
  templateUrl: './review-main.component.html',
  styleUrls: ['./review-main.component.scss']
})
export class ReviewMainComponent implements OnInit {

  projectTitle;
  startDate;
  proposedCompletionDate;
  numberOfExperts;
  categories;
  subcategories;
  skills;
  objectives;
  deliverables;
  briefDescription;
  anyOtherRequirements;
  questions;
  requireCoverLetterFromExperts;
  requireLocalExpert;
  hireConsultantAndMemberBoth;
  levelOfExpertise;
  location;
  projectSuccessScore = {
    min: 0,
    max: 0
  };
  earnedAmount;
  englishLevel;
  otherLanguage;
  privacy = {
    name: '',
    icon: ''
  };
  methods;
  payBy;
  currency;
  minAmount;
  maxAmount;
  workingHours;
  workWillUnderTaken;
  empProffessional;
  files = [];

  expertiseMapping = {
    '1': 'Rising',
    '2': 'Intermediate',
    '3': 'Expert',
    '4': 'Rising & Intermediate Both',
    '5': 'Intermediate & Expert Both',
    '6': 'Rising & Expert Both',
    '7': 'All'
  }

  earnedAmountMapping = {
    '1': 'Any Amount Earned',
    '2': '$100+ earned',
    '3': '$1k+ earned',
    '4': '$10k+ earned'
  }

  englistLevelMapping = {
    '1': 'Any Level',
    '2': 'Conversation Level',
    '3': 'Fluent or Better',
    '4': 'Native or Billingual'
  }

  workMapping = ['Online Only' , 'In Person', 'Online or In Person', 'Availibility to travel to other cities']

  empMapping = ['Hourly', 'Part Time', 'Full Time', 'Combination', "I'm not sure"];

  levelProgress = [25, 50, 75, 100];
  levels = [{levelId: 1 , level:'Any Level'}, {levelId:2, level: 'Conversation Level'},{ levelId:3, level:'Fluent or Better'}, {levelId:4, level:'Native or Billingual'}];


  constructor(private router: Router, private controlSectionService: ControlSectionService) { }

  ngOnInit(): void {
    this.controlSectionService.getBasicInfo().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.projectTitle= data.projectTitle;
        this.startDate = data.startDate;
        this.proposedCompletionDate = data.proposedCompletionDate;
        this.numberOfExperts = data.expertWantToHire.single ? 1 : data.expertWantToHire.numberOfExperts;
        this.categories = data.selectedCategory.map(cat => cat.category);
        this.subcategories = data.selectedSubCategory.map(subcat => subcat.subCategory);
        this.skills = data.selectedSkills.map(sk => sk.skill);
        this.objectives = data.selectedObjectives.map(obj => obj.category);
        this.deliverables = data.addDeliverables.map(del => del.deliverable);
        this.briefDescription = data.briefDescription;
        this.anyOtherRequirements = data.anyOtherRequirements;
        this.questions = data.questions;
        this.requireCoverLetterFromExperts = data.requireCoverLetterFromExperts;
        this.requireLocalExpert = data.requireLocalExpert;
        this.hireConsultantAndMemberBoth = data.hireConsultantAndMemberBoth;
        this.files = data.files;
      }
      console.log(this.files)
    }, (err: any)=> {
      console.log(err);
    });

    this.controlSectionService.getProjectPreference().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.levelOfExpertise = this.expertiseMapping[data.levelOfExpertise];
        this.location = data.location;
        this.projectSuccessScore = data.projectSuccessScore;
        this.earnedAmount = this.earnedAmountMapping[data.earnedAmount];
        this.englishLevel = this.englistLevelMapping[data.englishLevel];
        this.otherLanguage = data.otherLanguage.map(lang => ({
          name: lang.name,
          level: lang.level
        }));
      }
    }, (err: any)=> {
      console.log(err);
    });

    this.controlSectionService.getPrivacy().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.privacy = data.publicToWeb ? { name: 'Public', icon: 'public'} : {name: 'Platform', icon: 'phone_iphone'};
      }
    }, (err: any)=> {
      console.log(err);
    });

    this.controlSectionService.getMethodsOfCommunication().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.methods = [];
        if(data.messaging) {
          this.methods.push({
            name: 'Messaging',
            icon: 'sms'
          });
        }
        if(data.audio) {
          this.methods.push({
            name: 'Audio',
            icon: 'phone_in_talk'
          });
        }
        if(data.video) {
          this.methods.push({
            name: 'Video',
            icon: 'videocam'
          });
        }
      }
    }, (err: any)=> {
      console.log(err);
    });

    this.controlSectionService.getBudget().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.payBy = data.payByTheHour ? 'Pay by Hour' : data.payByFixedPrice ? 'Pay by Fixed Price' : 'Not Sure';
        this.currency = data.payByTheHour ? data.payByHourEstimatedBudget.ownHourlyRange.selectedCurrency?.currency : data.payByFixedPriceSpecificBudget.selectedCurrency?.currency;
        this.minAmount = data.payByHourEstimatedBudget.ownHourlyRange.amount.min;
        this.maxAmount = data.payByHourEstimatedBudget.ownHourlyRange.amount.max;
        this.workingHours = data.payByHourEstimatedBudget.maximumWorkingHour;
      }
    }, (err: any)=> {
      console.log(err);
    });

    this.controlSectionService.getWorkingPreference().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.workWillUnderTaken = data.workWillUnderTaken.map(ind => this.workMapping[ind - 1]);
        this.empProffessional = this.empMapping[data.empProffessional - 1]
      }
    }, (err: any)=> {
      console.log(err);
    });
  }

  getProgress(level) {
    return this.levelProgress[this.levels.findIndex(val => val.level === level)];
  }

  goToBasicInfo() {
    this.router.navigateByUrl('/create-project/basic-info');
  }

  goToProjectPreference() {
    this.router.navigateByUrl('/create-project/project-preference');
  }

  goToPrivacy() {
    this.router.navigateByUrl('create-project/privacy');
  }

  goToMethodsOfCommunication() {
    this.router.navigateByUrl('create-project/methods-of-communication')
  }

  goToBudget() {
    this.router.navigateByUrl('create-project/budget')
  }

  goToWorkingPreference() {
    this.router.navigateByUrl('create-project/working-preference')
  }

  submitProject() {
    this.controlSectionService.submitProject();
  }
}
