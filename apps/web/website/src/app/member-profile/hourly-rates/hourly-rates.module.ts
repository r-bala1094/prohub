import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebMaterialModule } from '@prohub/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyRatesComponent } from './hourly-rates/hourly-rates.component';
import { HourlyRatesRoutingModule } from './hourly-routing.module';



@NgModule({
  declarations: [
    HourlyRatesComponent
  ],
  imports: [
    CommonModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HourlyRatesRoutingModule,
  ]
})
export class HourlyRatesModule { }
