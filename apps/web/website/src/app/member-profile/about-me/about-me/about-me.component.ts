import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualMemberSignupStateService } from '../../service/individual-member-signup-state.service';

@Component({
  selector: 'prohub-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  aboutMeText: string;

  constructor(
    private individualMemberSignupStateService: IndividualMemberSignupStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.individualMemberSignupStateService.getAboutMe.subscribe(
      (data: any) => this.aboutMeText = data
    );
  }

  handleMovePage(buttonType: string) {
    this.individualMemberSignupStateService.setAboutMe(this.aboutMeText);
    const url = buttonType === 'next' ?
        'work-experience'
      : 'profile-info';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

}
