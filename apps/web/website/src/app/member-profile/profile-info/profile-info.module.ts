import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebMaterialModule } from '@prohub/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpClientModule } from '@angular/common/http';

import { ProfileInfoRoutingModule } from './profile-info-routing.module';
import { ProfileInfoComponent } from './profile-info/profile-info.component';


@NgModule({
  declarations: [ProfileInfoComponent],
  imports: [
    CommonModule,
    ProfileInfoRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    HttpClientModule
  ]
})
export class ProfileInfoModule { }
