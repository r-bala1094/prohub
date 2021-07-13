import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingMethodsRoutingModule } from './billing-methods-routing.module';
import { BillingMethodsMainComponent } from './components/billing-methods-main/billing-methods-main.component';
import { BillingMethodsViewComponent } from './components/billing-methods-view/billing-methods-view.component';
import { BillingMethodsEditComponent } from './components/billing-methods-edit/billing-methods-edit.component';


@NgModule({
  declarations: [
    BillingMethodsMainComponent,
    BillingMethodsViewComponent,
    BillingMethodsEditComponent
  ],
  imports: [
    CommonModule,
    BillingMethodsRoutingModule
  ]
})
export class BillingMethodsModule { }
