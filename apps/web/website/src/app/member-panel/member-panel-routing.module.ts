import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberPanelMainComponent } from './components/member-panel-main/member-panel-main.component';

const routes: Routes = [
  {
    path: '',
    component: MemberPanelMainComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () => import('../../../../../../libs/web/common-ui/src/lib/projects/projects.module').
        then((m)=> m.ProjectsModule)
      },
      {
        path: '',
        redirectTo: 'projects/projects',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'my-projects',
    component: MyProjectsComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () => import('../../../../../../libs/web/common-ui/src/lib/projects/projects.module').
        then((m)=> m.ProjectsModule)
      },
      {
        path: 'my-projects',
        redirectTo: 'projects/projects',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberPanelRoutingModule { }
