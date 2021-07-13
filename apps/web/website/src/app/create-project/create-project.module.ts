import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectMainComponent } from './create-project-main/create-project-main.component';
import { CreateProjectRoutingModule } from './create-project.routing.module';
import { WebMaterialModule } from '@prohub/material';
// import { ControlSectionService } from './services/control-section.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [CreateProjectMainComponent],
  imports: [CommonModule, CreateProjectRoutingModule, WebMaterialModule, HttpClientModule],
  // providers: [ControlSectionService],
})
export class CreateProjectModule {}
