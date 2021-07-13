import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionPlansMainComponent } from './components/subscription-plans-main/subscription-plans-main.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPlansMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionPlansRoutingModule { }
