import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordAndSecurityMainComponent } from './components/password-and-security-main/password-and-security-main.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordAndSecurityMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordAndSecurityRoutingModule { }
