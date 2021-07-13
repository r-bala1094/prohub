import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsListRoutingModule } from './projects-list-routing.module';
import { ProjectsListMainComponent } from './projects-list-main/projects-list-main.component';


@NgModule({
  declarations: [
    ProjectsListMainComponent
  ],
  imports: [
    CommonModule,
    ProjectsListRoutingModule
  ]
})
export class ProjectsListModule { }
