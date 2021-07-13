import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilestonesMainComponent } from './milestones-main/milestones-main.component';

const routes: Routes = [
  {
    path: '',
    component: MilestonesMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MilestonesRoutingModule { }
