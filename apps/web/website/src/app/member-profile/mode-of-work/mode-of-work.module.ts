import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeOfWorkComponent } from './mode-of-work/mode-of-work.component';
import { WebMaterialModule } from '@prohub/material';
import { ModeOfWorkRoutingModule } from './mode-of-work-routing.module';



@NgModule({
  declarations: [
    ModeOfWorkComponent
  ],
  imports: [
    CommonModule,
    WebMaterialModule,
    ModeOfWorkRoutingModule
  ]
})
export class ModeOfWorkModule { }
