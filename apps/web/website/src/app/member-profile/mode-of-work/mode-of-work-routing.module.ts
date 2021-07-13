import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeOfWorkComponent}  from './mode-of-work/mode-of-work.component';

const routes: Routes = [
  {
    path: '',
    component: ModeOfWorkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeOfWorkRoutingModule { }
