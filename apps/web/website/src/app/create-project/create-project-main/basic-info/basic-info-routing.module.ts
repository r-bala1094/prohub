import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicInfoMainComponent } from './basic-info-main/basic-info-main.component';
const routes: Routes = [
  {
    path: '',
    component: BasicInfoMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicInfoRoutingModule {}
