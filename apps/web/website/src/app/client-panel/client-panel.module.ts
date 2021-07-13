import { ProjectsModule } from './../../../../../../libs/web/common-ui/src/lib/projects/projects.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPanelRoutingModule } from './client-panel-routing.module';
import { ClientPanelMainComponent } from './components/client-panel-main/client-panel-main.component';
import { HeaderComponent } from './components/header/header.component';
import { HowWorksComponent } from './components/how-works/how-works.component';


@NgModule({
  declarations: [
    ClientPanelMainComponent,
    HeaderComponent,
    HowWorksComponent
  ],
  imports: [
    CommonModule,
    ClientPanelRoutingModule,
    ProjectsModule
  ]
})
export class ClientPanelModule { }
