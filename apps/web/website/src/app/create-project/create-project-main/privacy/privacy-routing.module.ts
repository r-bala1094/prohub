import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyMainComponent } from './privacy-main/privacy-main.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyRoutingModule {}
