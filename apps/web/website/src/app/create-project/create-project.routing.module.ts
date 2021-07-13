import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectMainComponent } from './create-project-main/create-project-main.component';

const routes: Routes = [
  {
    path: '',
    component: CreateProjectMainComponent,
    children: [
      {
        path: 'basic-info',
        loadChildren: () =>
          import('./create-project-main/basic-info/basic-info.module').then(
            (m) => m.BasicInfoModule
          ),
      },
      {
        path: 'project-preference',
        loadChildren: () =>
          import(
            './create-project-main/project-preference/project-preference.module'
          ).then((m) => m.ProjectPreferenceModule),
      },
      {
        path: 'privacy',
        loadChildren: () =>
          import('./create-project-main/privacy/privacy.module').then(
            (m) => m.PrivacyModule
          ),
      },
      {
        path: 'methods-of-communication',
        loadChildren: () =>
          import('./create-project-main/methods-of-communication/methods-of-communication.module').then(
            (m) => m.MethodsOfCommunicationModule
          ),
      },
      {
        path: 'budget',
        loadChildren: () =>
          import('./create-project-main/budget/budget.module').then(
            (m) => m.BudgetModule
          ),
      },
      {
        path: 'working-preference',
        loadChildren: () =>
          import('./create-project-main/working-preference/working-preference.module').then(
            (m) => m.WorkingPreferenceModule
          ),
      },
      {
        path: 'review',
        loadChildren: () =>
          import('./create-project-main/review/review.module').then(
            (m) => m.ReviewModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./create-project-main/basic-info/basic-info.module').then(
            (m) => m.BasicInfoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProjectRoutingModule {}
