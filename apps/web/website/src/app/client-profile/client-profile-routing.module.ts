import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile-info',
    loadChildren: () =>
      import('./modules/profile-info/profile-info.module').then(
        (m) => m.ProfileInfoModule
      ),
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./modules/location/location.module').then(
        (m) => m.LocationModule
      ),
  },
  {
    path: 'objectives',
    loadChildren: () =>
      import('./modules/objects-and-services/objects-and-services.module').then(
        (m) => m.ObjectsAndServicesModule
      ),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./modules/company-info/company-info.module').then(
        (m) => m.CompanyInfoModule
      ),
  },
  {
    path: 'password',
    loadChildren: () =>
      import('./modules/password-and-security/password-and-security.module').then(
        (m) => m.PasswordAndSecurityModule
      ),
  },
  {
    path: 'networking',
    loadChildren: () =>
      import('./modules/networking/networking.module').then(
        (m) => m.NetworkingModule
      ),
  },
  {
    path: 'plans',
    loadChildren: () =>
      import('./modules/subscription-plans/subscription-plans.module').then(
        (m) => m.SubscriptionPlansModule
      ),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./modules/billing-methods/billing-methods.module').then(
        (m) => m.BillingMethodsModule
      ),
  },
  {
    path: '',
    redirectTo: '/auth/signup/clientSignup/steps/profile-info',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProfileRoutingModule { }
