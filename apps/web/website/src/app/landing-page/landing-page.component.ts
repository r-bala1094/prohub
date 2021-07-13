import { IndividualMemberSignupHttpService } from './../member-profile/service/individual-member-signup-http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlSectionService } from '../create-project/services/control-section.service';

@Component({
  selector: 'prohub-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  allCategories = []
  isFetching = false;

  constructor(private router: Router, private controlSectionService: ControlSectionService, private categoriesService: IndividualMemberSignupHttpService) { }

  ngOnInit(): void {
    this.controlSectionService.login().subscribe(val => {
      this.controlSectionService.setToken(val['response'].data.token)
    }, (err: any)=> {
      console.log(err);
    })

    this.getCategories()
  }

  navigateTo(pageType: string) {
    this.router.navigateByUrl(pageType);
  }

  getCategories() {
    let cat: any = {}
    this.isFetching = true;
    this.categoriesService.getCategories().subscribe(
      data => {
        this.isFetching = false;
        cat = data;
        console.log(cat)
        this.allCategories = cat.response.data;
        return this.allCategories
      }
    )
  }
}
