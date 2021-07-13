import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSignupRoutingModule } from './client-signup-routing.module';
import { ClientSignupComponent } from './components/client-signup/client-signup.component';
import { WebMaterialModule } from '@prohub/material';


@NgModule({
  declarations: [
    ClientSignupComponent
  ],
  imports: [
    CommonModule,
    ClientSignupRoutingModule,
    WebMaterialModule
  ]
})
export class ClientSignupModule { }
