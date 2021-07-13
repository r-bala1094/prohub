import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersListRoutingModule } from './members-list-routing.module';
import { MembersListMainComponent } from './members-list-main/members-list-main.component';


@NgModule({
  declarations: [
    MembersListMainComponent
  ],
  imports: [
    CommonModule,
    MembersListRoutingModule
  ]
})
export class MembersListModule { }
