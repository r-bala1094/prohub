import { HourlyRatesComponent } from './../../../../../member-profile/hourly-rates/hourly-rates/hourly-rates.component';
import { ProjectServicesComponent } from 'apps/web/website/src/app/member-profile/project-services/project-services/project-services.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutMeComponent } from 'apps/web/website/src/app/member-profile/about-me/about-me/about-me.component';
import { AvailabilityComponent } from 'apps/web/website/src/app/member-profile/availability/availability/availability.component';
import { CategoriesAndSkillsComponent } from 'apps/web/website/src/app/member-profile/categories-and-skills/categories-and-skills/categories-and-skills.component';
import { EducationComponent } from 'apps/web/website/src/app/member-profile/education/education/education.component';
import { LanguageComponent } from 'apps/web/website/src/app/member-profile/language/language/language.component';
import { LocationComponent } from 'apps/web/website/src/app/member-profile/location/location/location.component';
import { ModeOfWorkComponent } from 'apps/web/website/src/app/member-profile/mode-of-work/mode-of-work/mode-of-work.component';
import { ProfileInfoComponent } from 'apps/web/website/src/app/member-profile/profile-info/profile-info/profile-info.component';
import { UploadCvComponent } from 'apps/web/website/src/app/member-profile/upload-cv/upload-cv/upload-cv.component';
import { WorkExperienceComponent } from 'apps/web/website/src/app/member-profile/work-experience/work-experience/work-experience.component';
import { IntroVideoComponent } from 'apps/web/website/src/app/member-profile/intro-video/intro-video/intro-video.component';

@Component({
  selector: 'prohub-individual-member-signup',
  templateUrl: './individual-member-signup.component.html',
  styleUrls: ['./individual-member-signup.component.scss']
})
export class IndividualMemberSignupComponent implements OnInit {

  // current tab indexing begin from 0(1st tab = 0, 13th tab = 12)
  currentTab: number = 0;
  tabVisited: boolean[] =[true, false, false, false, false, false, false, false, false, false, false, false, false,];
  arrayOfTabs = [
    {
      name: 'Upload CV',
      icon: 'upload_file',
      component: UploadCvComponent,
      url: '/upload-cv'
    },
    {
      name: 'Profile Info',
      icon: 'person',
      component: ProfileInfoComponent,
      url: '/profile-info',
    },
    {
      name: 'About Me',
      icon: 'info',
      component: AboutMeComponent,
      url: '/about-me',
    },
    {
      name: 'Work Experience',
      icon: 'star',
      component: WorkExperienceComponent,
      url: '/work-experience',
    },
    {
      name: 'Education & Certification',
      icon: 'school',
      component: EducationComponent,
      url: '/education',
    },
    {
      name: 'Categories & Skills',
      icon: 'list',
      component: CategoriesAndSkillsComponent,
      url: '/categories',
    },
    {
      name: 'Project & Services',
      icon: 'content_paste',
      component: ProjectServicesComponent,
      url: '/project-services',
    },
    {
      name: 'Introduction Video',
      icon: 'videocam',
      component: IntroVideoComponent,
      url: '/intro-video',
    },
    {
      name: 'Hourly Rates',
      icon: 'attach_money',
      component: HourlyRatesComponent,
      url: '/hourly-rates',
    },
    {
      name: 'Availability & Capacity',
      icon: 'done',
      component: AvailabilityComponent,
      url: '/availability',
    },
    {
      name: 'Mode of Work',
      icon: 'work',
      component: ModeOfWorkComponent,
      url: '/modeofwork',
    },
    {
      name: 'Location',
      icon: 'place',
      component: LocationComponent,
      url: '/location',
    },
    {
      name: 'Add Language',
      icon: 'language',
      component:LanguageComponent,
      url: '/language',
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const userReloadPage = localStorage.getItem('memberSignupCurrentTab');
    userReloadPage ? this.setCurrentTab(userReloadPage) : this.setCurrentTab(this.arrayOfTabs[0].url);
  }

  componentAdded(event) {
    this.currentTab = this.arrayOfTabs.findIndex(element => event instanceof <any>element.component);
    localStorage.setItem('memberSignupCurrentTab', this.arrayOfTabs[this.currentTab].url);
    for (let i = 0; i <= this.currentTab; i++)
      this.tabVisited[i] = true;
  }

  setCurrentTab(url) {
    localStorage.setItem('memberSignupCurrentTab', url);
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps'+ url);
  }

}
