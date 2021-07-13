import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchProjectsRoutingModule } from './search-projects-routing.module';
import { SearchProjectsMainComponent } from './search-projects-main/search-projects-main.component';


@NgModule({
  declarations: [
    SearchProjectsMainComponent
  ],
  imports: [
    CommonModule,
    SearchProjectsRoutingModule
  ]
})
export class SearchProjectsModule { }
