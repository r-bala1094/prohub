import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordAndSecurityRoutingModule } from './password-and-security-routing.module';
import { PasswordAndSecurityMainComponent } from './components/password-and-security-main/password-and-security-main.component';
import { PasswordAndSecurityViewComponent } from './components/password-and-security-view/password-and-security-view.component';
import { PasswordAndSecurityEditComponent } from './components/password-and-security-edit/password-and-security-edit.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PasswordAndSecurityMainComponent,
    PasswordAndSecurityViewComponent,
    PasswordAndSecurityEditComponent
  ],
  imports: [
    CommonModule,
    PasswordAndSecurityRoutingModule,
    WebMaterialModule,
    ReactiveFormsModule
  ]
})
export class PasswordAndSecurityModule { }
