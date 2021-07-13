import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlSectionService } from '../services/control-section.service';
import { BasicInfoMainComponent } from './basic-info/basic-info-main/basic-info-main.component';
import { BudgetMainComponent } from './budget/budget-main/budget-main.component';
import { MethodsOfCommunicationMainComponent } from './methods-of-communication/methods-of-communication-main/methods-of-communication-main.component';
import { PrivacyMainComponent } from './privacy/privacy-main/privacy-main.component';
import { PreferenceMainComponent } from './project-preference/preference-main/preference-main.component';
import { ReviewMainComponent } from './review/review-main/review-main.component';
import { WorkingPreferenceMainComponent } from './working-preference/working-preference-main/working-preference-main.component';

@Component({
  selector: 'prohub-create-project-main',
  templateUrl: './create-project-main.component.html',
  styleUrls: ['./create-project-main.component.scss']
})
export class CreateProjectMainComponent implements OnInit {

  // current tab indexing begin from 0(1st tab = 0, 13th tab = 12)
  currentTab: number = 0;
  tabVisited: boolean[] =[false, false, false, false, false, false, false];

  arrayOfTabs = [
    { name: 'Basic Info', icon: 'edit'},
    { name: 'Project Preference', icon: 'assignment'},
    { name: 'Privacy', icon: 'lock'},
    { name: 'Methods of communication', icon: 'call'},
    { name: 'Budget', icon: 'attach_money'},
    { name: 'Working Preference', icon: 'assignment'},
    { name: 'Review', icon: 'done'},
  ];

  components = [
    BasicInfoMainComponent,
    PreferenceMainComponent,
    PrivacyMainComponent,
    MethodsOfCommunicationMainComponent,
    BudgetMainComponent,
    WorkingPreferenceMainComponent,
    ReviewMainComponent
  ]

  urls = [
    '/basic-info',
    '/project-preference',
    '/privacy',
    '/methods-of-communication',
    '/budget',
    '/working-preference',
    '/review'
  ]

  constructor(private router: Router, private controlSectionService : ControlSectionService) { }

  ngOnInit(): void {
    let projectId = this.controlSectionService.checkProjectId();
    if(!projectId) {
      this.controlSectionService.getProjectId().subscribe(val => {
        this.controlSectionService.setProjectId(val['response'].data)
      }, (err: any)=> {
        console.log(err);
      })
    }
  }

  componentAdded(event) {
    this.currentTab = this.components.findIndex(component => event instanceof <any>component);
    this.tabVisited[this.currentTab] = true;
  }

  setCurrentTab(i) {
    this.router.navigateByUrl('/create-project'+ this.urls[i]);
  }
}
