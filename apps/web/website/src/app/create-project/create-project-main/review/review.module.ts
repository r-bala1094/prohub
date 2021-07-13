import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewMainComponent } from './review-main/review-main.component';
import { WebMaterialModule } from '@prohub/material';


@NgModule({
  declarations: [
    ReviewMainComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    WebMaterialModule
  ]
})
export class ReviewModule { }
