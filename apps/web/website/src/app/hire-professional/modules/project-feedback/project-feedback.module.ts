import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectFeedbackRoutingModule } from './project-feedback-routing.module';
import { ProjectFeedbackMainComponent } from './project-feedback-main/project-feedback-main.component';


@NgModule({
  declarations: [
    ProjectFeedbackMainComponent
  ],
  imports: [
    CommonModule,
    ProjectFeedbackRoutingModule
  ]
})
export class ProjectFeedbackModule { }
