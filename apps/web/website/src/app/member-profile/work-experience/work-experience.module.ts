import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { WorkExperienceRoutingModule } from './work-experience-routing.module';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { WorkExperienceFormComponent } from './work-experience-form/work-experience-form.component';


@NgModule({
  declarations: [WorkExperienceComponent, WorkExperienceFormComponent],
  imports: [
    CommonModule,
    WorkExperienceRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class WorkExperienceModule { }
