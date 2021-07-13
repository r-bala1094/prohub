import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionPlansRoutingModule } from './subscription-plans-routing.module';
import { SubscriptionPlansMainComponent } from './components/subscription-plans-main/subscription-plans-main.component';
import { SubscriptionPlansViewComponent } from './components/subscription-plans-view/subscription-plans-view.component';
import { AvailablePlansComponent } from './components/available-plans/available-plans.component';
import { BuyPointsComponent } from './components/buy-points/buy-points.component';


@NgModule({
  declarations: [
    SubscriptionPlansMainComponent,
    SubscriptionPlansViewComponent,
    AvailablePlansComponent,
    BuyPointsComponent
  ],
  imports: [
    CommonModule,
    SubscriptionPlansRoutingModule
  ]
})
export class SubscriptionPlansModule { }
