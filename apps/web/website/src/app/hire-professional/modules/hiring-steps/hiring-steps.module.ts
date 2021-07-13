import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringStepsRoutingModule } from './hiring-steps-routing.module';
import { HiringStepsMainComponent } from './hiring-steps-main/hiring-steps-main.component';


@NgModule({
  declarations: [
    HiringStepsMainComponent
  ],
  imports: [
    CommonModule,
    HiringStepsRoutingModule
  ]
})
export class HiringStepsModule { }
