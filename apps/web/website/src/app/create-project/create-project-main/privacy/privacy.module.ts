import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyMainComponent } from './privacy-main/privacy-main.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrivacyMainComponent
  ],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    WebMaterialModule, ReactiveFormsModule
  ]
})
export class PrivacyModule { }
