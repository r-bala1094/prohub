import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicateWithProfessionalsRoutingModule } from './communicate-with-professionals-routing.module';
import { CommunicateWithProfessionalsMainComponent } from './communicate-with-professionals-main/communicate-with-professionals-main.component';


@NgModule({
  declarations: [
    CommunicateWithProfessionalsMainComponent
  ],
  imports: [
    CommonModule,
    CommunicateWithProfessionalsRoutingModule
  ]
})
export class CommunicateWithProfessionalsModule { }
