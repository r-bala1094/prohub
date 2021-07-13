import { CountryList } from './services/countrylist.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { WebMaterialModule } from '@prohub/material';
import { SignupComponent } from './signup/signup.component';
import { DesignationModule } from '@prohub/common-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupHttpService } from './services/signup.http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    WebMaterialModule,
    DesignationModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [SignupHttpService, CountryList],
  bootstrap: [],
})
export class SignupModule {}
