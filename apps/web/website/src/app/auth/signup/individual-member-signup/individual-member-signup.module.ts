import { WebMaterialModule } from '@prohub/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpClientModule } from '@angular/common/http';

import { IndividualMemberSignupRoutingModule } from './individual-member-signup-routing.module';
import { IndividualMemberSignupComponent } from './components/individual-member-signup/individual-member-signup.component';


@NgModule({
  declarations: [
    IndividualMemberSignupComponent
  ],
  imports: [
    CommonModule,
    IndividualMemberSignupRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    HttpClientModule
  ]
})
export class IndividualMemberSignupModule {

  constructor() {

  }
  ngOnInit() {

  }
}
