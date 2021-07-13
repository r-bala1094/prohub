import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodsOfCommunicationRoutingModule } from './methods-of-communication-routing.module';
import { MethodsOfCommunicationMainComponent } from './methods-of-communication-main/methods-of-communication-main.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MethodsOfCommunicationMainComponent
  ],
  imports: [
    CommonModule,
    MethodsOfCommunicationRoutingModule,
    WebMaterialModule,
    ReactiveFormsModule
  ]
})
export class MethodsOfCommunicationModule { }
