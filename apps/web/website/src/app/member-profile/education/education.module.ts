import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EducationRoutingModule } from './education-routing.module';
import { EducationComponent } from './education/education.component';
import { EducationFormComponent } from './education-form/education-form.component';


@NgModule({
  declarations: [EducationComponent, EducationFormComponent],
  imports: [
    CommonModule,
    EducationRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class EducationModule { }
