import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendProposalRoutingModule } from './send-proposal-routing.module';
import { SendProposalMainComponent } from './send-proposal-main/send-proposal-main.component';


@NgModule({
  declarations: [
    SendProposalMainComponent
  ],
  imports: [
    CommonModule,
    SendProposalRoutingModule
  ]
})
export class SendProposalModule { }
