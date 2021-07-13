import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationEditComponent } from './components/location-edit/location-edit.component';
import { LocationViewComponent } from './components/location-view/location-view.component';
import { LocationMainComponent } from './components/location-main/location-main.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LocationEditComponent,
    LocationViewComponent,
    LocationMainComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    WebMaterialModule,
    ReactiveFormsModule
  ]
})
export class LocationModule { }
