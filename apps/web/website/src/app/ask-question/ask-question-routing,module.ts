
import { AskQuestionMainComponent } from './ask-question-main/ask-question-main.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AskQuestionMainComponent,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./add-question/add-question.module').then(
        (m) => m.AddQuestionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskQuestionRoutingModule {}
