import { HowWorksComponent } from './components/how-works/how-works.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPanelMainComponent } from './components/client-panel-main/client-panel-main.component';

const routes: Routes = [
  {
    path: '',
    component: ClientPanelMainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../../../../../libs/web/common-ui/src/lib/projects/projects.module').
        then((m)=> m.ProjectsModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'how-works',
    component: HowWorksComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPanelRoutingModule { }
