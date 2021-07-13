import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkingMainComponent } from './components/networking-main/networking-main.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkingMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkingRoutingModule { }
