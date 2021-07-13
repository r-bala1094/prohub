import { CreateQuestionComponent } from './create-question/create-question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebMaterialModule } from '@prohub/material';
import { AddQuestionRouting } from './add-routing.module';
import { CategoryComponent } from './create-question/category/category.component';
import { TitleDescriptionComponent } from './create-question/title-description/title-description.component';
import { RequireLocalComponent } from './create-question/require-local/require-local.component';
import { SuccessMessageComponent } from './success-message/success-message.component';



@NgModule({
  declarations: [
    CreateQuestionComponent,
    CategoryComponent,
    TitleDescriptionComponent,
    RequireLocalComponent,
    SuccessMessageComponent,
  ],
  imports: [
    CommonModule,
    WebMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AddQuestionRouting,
  ]
})
export class AddQuestionModule { }
