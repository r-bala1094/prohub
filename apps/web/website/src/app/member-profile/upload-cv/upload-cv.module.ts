import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpClientModule } from '@angular/common/http';

import { UploadCvRoutingModule } from './upload-cv-routing.module';
import { UploadCvComponent } from './upload-cv/upload-cv.component';


@NgModule({
  declarations: [UploadCvComponent],
  imports: [
    CommonModule,
    UploadCvRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    HttpClientModule
  ]
})
export class UploadCvModule { }
