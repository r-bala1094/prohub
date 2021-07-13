import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpClientModule } from '@angular/common/http';

import { CategoriesAndSkillsRoutingModule } from './categories-and-skills-routing.module';
import { CategoriesAndSkillsComponent } from './categories-and-skills/categories-and-skills.component';


@NgModule({
  declarations: [CategoriesAndSkillsComponent],
  imports: [
    CommonModule,
    CategoriesAndSkillsRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    HttpClientModule
  ]
})
export class CategoriesAndSkillsModule { }
