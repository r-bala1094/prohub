import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './language/language.component';
import { LanguageRoutingModule } from './language-routing.module';
import { WebMaterialModule } from '@prohub/material';



@NgModule({
  declarations: [
    LanguageComponent
  ],
  imports: [
    CommonModule,
    WebMaterialModule,
    LanguageRoutingModule
  ]
})
export class LanguageModule { }
