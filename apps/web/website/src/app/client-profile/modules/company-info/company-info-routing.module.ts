import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoMainComponent } from './components/company-info-main/company-info-main.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyInfoMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInfoRoutingModule { }
