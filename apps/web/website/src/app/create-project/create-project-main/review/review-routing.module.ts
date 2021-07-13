import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewMainComponent } from './review-main/review-main.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
