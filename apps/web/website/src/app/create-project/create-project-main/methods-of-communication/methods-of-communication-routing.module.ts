import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MethodsOfCommunicationMainComponent } from './methods-of-communication-main/methods-of-communication-main.component';

const routes: Routes = [
  {
    path: '',
    component: MethodsOfCommunicationMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MethodsOfCommunicationRoutingModule { }
