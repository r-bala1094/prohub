import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingPreferenceRoutingModule } from './working-preference-routing.module';
import { WorkingPreferenceMainComponent } from './working-preference-main/working-preference-main.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WorkingPreferenceMainComponent
  ],
  imports: [
    CommonModule,
    WorkingPreferenceRoutingModule,
    WebMaterialModule,
    ReactiveFormsModule
  ]
})
export class WorkingPreferenceModule { }
