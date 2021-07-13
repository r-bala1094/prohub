import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertiseComponent } from './expertise/expertise.component';

@NgModule({
  declarations: [ExpertiseComponent],
  imports: [CommonModule],
  exports: [ExpertiseComponent],
})

export class AccountTypeModule {}
