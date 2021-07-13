
import { AddQuestionModule } from './add-question/add-question.module';
import { AskQuestionRoutingModule } from './ask-question-routing,module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AskQuestionMainComponent } from './ask-question-main/ask-question-main.component';
import { WebMaterialModule } from '@prohub/material';



@NgModule({
  declarations: [
    AskQuestionMainComponent,
  ],
  imports: [
    CommonModule,
    AskQuestionRoutingModule,
    AddQuestionModule,
    WebMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AskQuestionModule { }
