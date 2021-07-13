import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenceMainComponent } from './preference-main/preference-main.component';
import { PreferenceMainRoutingModule } from './preference-main.routing.module';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpertiseComponent } from './preference-main/expertise/expertise.component';
import { ProjectSuccessComponent } from './preference-main/project-success/project-success.component';
import { LanguagesComponent } from './preference-main/languages/languages.component';
import { NouisliderModule } from 'ng2-nouislider';

@NgModule({
  declarations: [PreferenceMainComponent, ExpertiseComponent, ProjectSuccessComponent, LanguagesComponent],
  imports: [CommonModule, PreferenceMainRoutingModule, WebMaterialModule, ReactiveFormsModule, NouisliderModule],
})
export class ProjectPreferenceModule {}
