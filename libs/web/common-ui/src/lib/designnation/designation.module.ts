import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationOptionComponent } from './designation-options/designation-options.component';
import { WebMaterialModule } from '@prohub/material';
import { ReactiveFormsModule } from '@angular/forms';
// import { HttpService } from './service/http-service.service';

@NgModule({
  declarations: [DesignationOptionComponent],
  imports: [CommonModule, WebMaterialModule, ReactiveFormsModule],
  exports: [DesignationOptionComponent],
  providers: [],
})
export class DesignationModule {}
