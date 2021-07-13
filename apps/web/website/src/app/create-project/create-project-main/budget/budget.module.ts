import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetMainComponent } from './budget-main/budget-main.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BudgetMainComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    WebMaterialModule,
    ReactiveFormsModule
  ]
})
export class BudgetModule { }
