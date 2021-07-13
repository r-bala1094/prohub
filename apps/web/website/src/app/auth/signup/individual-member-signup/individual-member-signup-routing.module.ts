import { IndividualMemberSignupComponent } from './components/individual-member-signup/individual-member-signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: IndividualMemberSignupComponent,
    children: [
      {
        path: 'steps',
        loadChildren: () =>
          import('../../../member-profile/member-profile.module').then(
            (m) => m.MemberProfileModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualMemberSignupRoutingModule { }
