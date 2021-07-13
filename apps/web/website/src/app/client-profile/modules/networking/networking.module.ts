import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkingRoutingModule } from './networking-routing.module';
import { NetworkingMainComponent } from './components/networking-main/networking-main.component';


@NgModule({
  declarations: [
    NetworkingMainComponent
  ],
  imports: [
    CommonModule,
    NetworkingRoutingModule
  ]
})
export class NetworkingModule { }
