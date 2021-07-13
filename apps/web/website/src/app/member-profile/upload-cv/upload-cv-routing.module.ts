import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadCvComponent } from './upload-cv/upload-cv.component';

const routes: Routes = [
  {
    path: '',
    component: UploadCvComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadCvRoutingModule { }
