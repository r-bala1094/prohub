import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  },
  {
    path: 'individualMemberSignup',
    loadChildren: () =>
      import('./../signup/individual-member-signup/individual-member-signup.module').then((m) => m.IndividualMemberSignupModule),
  },
  {
    path: 'clientSignup',
    loadChildren: () => 
      import('./client-signup/client-signup.module').then((m) => m.ClientSignupModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
