import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectsAndServicesRoutingModule } from './objects-and-services-routing.module';
import { ObjectsAndServicesMainComponent } from './components/objects-and-services-main/objects-and-services-main.component';
import { ObjectsViewComponent } from './components/objects-view/objects-view.component';
import { ObjectsEditComponent } from './components/objects-edit/objects-edit.component';
import { ServicesEditComponent } from './components/services-edit/services-edit.component';
import { ServicesViewComponent } from './components/services-view/services-view.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ObjectsAndServicesMainComponent,
    ObjectsViewComponent,
    ObjectsEditComponent,
    ServicesEditComponent,
    ServicesViewComponent
  ],
  imports: [
    CommonModule,
    ObjectsAndServicesRoutingModule,
    WebMaterialModule,
    ReactiveFormsModule
  ]
})
export class ObjectsAndServicesModule { }
