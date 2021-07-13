import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSignupComponent } from './components/client-signup/client-signup.component';

const routes: Routes = [
  {
    path: "",
    component: ClientSignupComponent,
    children: [
      {
        path: 'steps',
        loadChildren: () =>
          import('../../../client-profile/client-profile.module').then(
            (m) => m.ClientProfileModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSignupRoutingModule { }
