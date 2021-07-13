import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location/location.component';
import { LocationRoutingModule } from '../../client-profile/modules/location/location-routing.module';
import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LocationComponent
  ],
  imports: [
    CommonModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LocationRoutingModule,
    
  ]
})
export class LocationModule { }
