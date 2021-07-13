import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyInfoRoutingModule } from './company-info-routing.module';
import { CompanyInfoMainComponent } from './components/company-info-main/company-info-main.component';
import { CompanyInfoViewComponent } from './components/company-info-view/company-info-view.component';
import { CompanyInfoEditComponent } from './components/company-info-edit/company-info-edit.component';
import { WebMaterialModule } from '@prohub/material';


@NgModule({
  declarations: [
    CompanyInfoMainComponent,
    CompanyInfoViewComponent,
    CompanyInfoEditComponent
  ],
  imports: [
    CommonModule,
    CompanyInfoRoutingModule,
    WebMaterialModule
  ]
})
export class CompanyInfoModule { }
