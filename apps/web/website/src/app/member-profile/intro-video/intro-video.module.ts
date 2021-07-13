import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpClientModule } from '@angular/common/http';

import { IntroVideoRoutingModule } from './intro-video-routing.module';
import { IntroVideoComponent } from './intro-video/intro-video.component';


@NgModule({
  declarations: [
    IntroVideoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GooglePlaceModule,
    HttpClientModule,
    IntroVideoRoutingModule,
    ReactiveFormsModule,
    WebMaterialModule
  ]
})
export class IntroVideoModule { }
