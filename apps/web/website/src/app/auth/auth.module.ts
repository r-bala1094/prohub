import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './auth-routing.module';
import { AccountTypeModule } from '@prohub/account-type';
import { WebMaterialModule } from '@prohub/material';

import { SignupAccountTypeComponent } from './signup-account-type/signup-account-type.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [SignupAccountTypeComponent, LoginComponent],
  imports: [AppRoutingModule, CommonModule, AccountTypeModule, WebMaterialModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
})
export class AuthModule {}
