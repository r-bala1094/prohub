import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesAndSkillsComponent } from './categories-and-skills/categories-and-skills.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesAndSkillsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesAndSkillsRoutingModule { }
