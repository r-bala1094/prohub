import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilestonesRoutingModule } from './milestones-routing.module';
import { MilestonesMainComponent } from './milestones-main/milestones-main.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MilestonesMainComponent
  ],
  imports: [
    CommonModule,
    MilestonesRoutingModule,
    WebMaterialModule,
    ReactiveFormsModule
  ]
})
export class MilestonesModule { }
