import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProjectServicesRoutingModule } from './project-services-routing.module';
import { ProjectServicesComponent } from './project-services/project-services.component';
import { ProjectServicesFormComponent } from './project-services-form/project-services-form.component';
import { FilterByIdPipe } from './pipes/filter-by-id.pipe';
import { DndDirective } from './directive/dnd.directive';


@NgModule({
  declarations: [
    ProjectServicesComponent,
    ProjectServicesFormComponent,
    FilterByIdPipe,
    DndDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProjectServicesRoutingModule,
    ReactiveFormsModule,
    WebMaterialModule
  ]
})
export class ProjectServicesModule { }
