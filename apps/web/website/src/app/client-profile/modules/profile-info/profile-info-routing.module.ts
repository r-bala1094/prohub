import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileInfoMainComponent } from './components/profile-info-main/profile-info-main.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileInfoMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileInfoRoutingModule { }
