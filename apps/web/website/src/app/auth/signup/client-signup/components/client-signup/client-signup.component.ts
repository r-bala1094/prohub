import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prohub-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.scss']
})
export class ClientSignupComponent implements OnInit {

  currentTab: number = 0;
  tabVisited: boolean[] =[true, false, false, false, false, false, false, false];
  arrayOfTabs = [
    {
      name: 'Profile Info',
      icon: 'person',
      url: '/profile-info',
    },
    {
      name: 'Location',
      icon: 'place',
      url: '/location',
    },
    {
      name: 'Objectives & Services',
      icon: 'list_alt',
      url: '/objectives',
    },
    {
      name: 'Company Info',
      icon: 'business',
      url: '/company',
    },
    {
      name: 'Password & Security',
      icon: 'lock',
      url: '/password',
    },
    {
      name: 'Networking',
      icon: 'people',
      url: '/networking',
    },
    
    {
      name: 'Subscription Plans (Points)',
      icon: 'card_membership',
      url: '/plans',
    },
    {
      name: 'Billing Methods',
      icon: 'payment',
      url: '/billing',
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const userReloadPage = localStorage.getItem('clientSignupCurrentTab');
    userReloadPage ? this.setCurrentTab(userReloadPage) : this.setCurrentTab(this.arrayOfTabs[0].url);
  }

  componentAdded(event) {
    // this.currentTab = this.arrayOfTabs.findIndex(element => event instanceof <any>element.component);
    localStorage.setItem('clientSignupCurrentTab', this.arrayOfTabs[this.currentTab].url);
    for (let i = 0; i <= this.currentTab; i++)
      this.tabVisited[i] = true;
  }

  setCurrentTab(url) {
    this.currentTab = this.arrayOfTabs.findIndex(element => url === element.url);
    for (let i = 0; i <= this.currentTab; i++) {
      this.tabVisited[i] = true;
    }
    localStorage.setItem('clientSignupCurrentTab', url);
    this.router.navigateByUrl('/auth/signup/clientSignup/steps'+ url);
  }

  onButtonClick(type) {
    if (!( (type === 'next' && this.currentTab === this.arrayOfTabs.length -1) || (type === 'back' && this.currentTab === 0) )) {
      type === 'next' ? this.currentTab++ : this.currentTab--;
      this.setCurrentTab(this.arrayOfTabs[this.currentTab].url);
    }
  }

}
