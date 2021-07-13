import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidProjectsRoutingModule } from './bid-projects-routing.module';
import { BidProjectsMainComponent } from './bid-projects-main/bid-projects-main.component';
import { SearchProjectsModule } from './modules/search-projects/search-projects.module';
import { SendProposalModule } from './modules/send-proposal/send-proposal.module';
import { ProposalsListModule } from './modules/proposals-list/proposals-list.module';


@NgModule({
  declarations: [
    BidProjectsMainComponent
  ],
  imports: [
    CommonModule,
    BidProjectsRoutingModule,
    SearchProjectsModule,
    SendProposalModule,
    ProposalsListModule
  ]
})
export class BidProjectsModule { }
