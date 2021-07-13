import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkingPreferenceMainComponent } from './working-preference-main/working-preference-main.component';

const routes: Routes = [
  {
    path: '',
    component: WorkingPreferenceMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingPreferenceRoutingModule { }
