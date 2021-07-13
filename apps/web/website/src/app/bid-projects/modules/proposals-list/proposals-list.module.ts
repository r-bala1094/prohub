import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalsListRoutingModule } from './proposals-list-routing.module';
import { ProposalsListMainComponent } from './proposals-list-main/proposals-list-main.component';


@NgModule({
  declarations: [
    ProposalsListMainComponent
  ],
  imports: [
    CommonModule,
    ProposalsListRoutingModule
  ]
})
export class ProposalsListModule { }
