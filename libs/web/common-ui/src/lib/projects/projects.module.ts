import { ProjectService } from './components/services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { WebMaterialModule } from '@prohub/material';


@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    WebMaterialModule,
    HttpClientModule,
  ],
  providers: [ProjectService]
})
export class ProjectsModule { }
