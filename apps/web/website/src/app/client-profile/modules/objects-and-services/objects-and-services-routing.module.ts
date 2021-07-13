import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectsAndServicesMainComponent } from './components/objects-and-services-main/objects-and-services-main.component';

const routes: Routes = [
  {
    path: '',
    component: ObjectsAndServicesMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectsAndServicesRoutingModule { }
