import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewProposalsRoutingModule } from './review-proposals-routing.module';
import { ReviewProposalsMainComponent } from './review-proposals-main/review-proposals-main.component';


@NgModule({
  declarations: [
    ReviewProposalsMainComponent
  ],
  imports: [
    CommonModule,
    ReviewProposalsRoutingModule
  ]
})
export class ReviewProposalsModule { }
