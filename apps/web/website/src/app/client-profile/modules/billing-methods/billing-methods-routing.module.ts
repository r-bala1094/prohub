import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingMethodsMainComponent } from './components/billing-methods-main/billing-methods-main.component';

const routes: Routes = [
  {
    path: '',
    component: BillingMethodsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingMethodsRoutingModule { }
