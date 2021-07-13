import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferenceMainComponent } from './preference-main/preference-main.component';

const routes: Routes = [
  {
    path: '',
    component: PreferenceMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferenceMainRoutingModule {}
