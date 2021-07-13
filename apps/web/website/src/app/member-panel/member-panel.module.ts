import { WebMaterialModule } from '@prohub/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberPanelRoutingModule } from './member-panel-routing.module';
import { MemberPanelMainComponent } from './components/member-panel-main/member-panel-main.component';
import { HeaderComponent } from './components/header/header.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';


@NgModule({
  declarations: [
    MemberPanelMainComponent,
    HeaderComponent,
    MyProjectsComponent
  ],
  imports: [
    CommonModule,
    MemberPanelRoutingModule,
    WebMaterialModule
  ]
})
export class MemberPanelModule { }
