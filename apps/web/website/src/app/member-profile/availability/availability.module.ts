import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AvailabilityComponent } from './availability/availability.component';
import { AvailabilityRoutingModule } from './availability-routing.module';
import { WebMaterialModule } from '@prohub/material';



@NgModule({
  declarations: [
    AvailabilityComponent
  ],
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    WebMaterialModule, 
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AvailabilityModule { }
