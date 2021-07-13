import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileInfoRoutingModule } from './profile-info-routing.module';
import { ProfileInfoEditComponent } from './components/profile-info-edit/profile-info-edit.component';
import { ProfileInfoViewComponent } from './components/profile-info-view/profile-info-view.component';
import { ProfileInfoMainComponent } from './components/profile-info-main/profile-info-main.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileInfoEditComponent,
    ProfileInfoViewComponent,
    ProfileInfoMainComponent
  ],
  imports: [
    CommonModule,
    ProfileInfoRoutingModule,
    WebMaterialModule,
    ReactiveFormsModule
  ]
})
export class ProfileInfoModule { }
