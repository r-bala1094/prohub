import { SuccessMessageComponent } from './success-message/success-message.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CreateQuestionComponent
  },
  {
    path: 'success',
    component: SuccessMessageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddQuestionRouting {}
