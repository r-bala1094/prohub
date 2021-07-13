import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AboutMeModule } from './about-me/about-me.module';
import { CategoriesAndSkillsModule } from './categories-and-skills/categories-and-skills.module';
import { EducationModule } from './education/education.module';
import { IndividualMemberSignupHttpService } from './service/individual-member-signup-http.service';
import { IndividualMemberSignupStateService } from './service/individual-member-signup-state.service';
import { IntroVideoModule } from './intro-video/intro-video.module';
import { MemberProfileRoutingModule } from './member-profile-routing.module';
import { ProfileInfoModule } from './profile-info/profile-info.module';
import { ProjectServicesModule } from './project-services/project-services.module';
import { UploadCvModule } from './upload-cv/upload-cv.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { AvailabilityModule } from './availability/availability.module';
import { ModeOfWorkModule } from './mode-of-work/mode-of-work.module';
import { LanguageModule } from './language/language.module';
import { LocationModule } from './location/location.module';


@NgModule({
  declarations: [],
  imports: [
    AboutMeModule,
    CategoriesAndSkillsModule,
    CommonModule,
    EducationModule,
    FormsModule,
    HttpClientModule,
    IntroVideoModule,
    MemberProfileRoutingModule,
    ReactiveFormsModule,
    ProfileInfoModule,
    ProjectServicesModule,
    UploadCvModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvailabilityModule,
    ModeOfWorkModule,
    LocationModule,
    LanguageModule,
    WorkExperienceModule
  ],
  providers: [
    IndividualMemberSignupHttpService,
    IndividualMemberSignupStateService
  ]
})
export class MemberProfileModule { }
