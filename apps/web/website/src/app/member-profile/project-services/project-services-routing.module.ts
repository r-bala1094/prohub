import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectServicesComponent } from './project-services/project-services.component';

const routes: Routes = [
  {
    path: "",
    component: ProjectServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectServicesRoutingModule { }
