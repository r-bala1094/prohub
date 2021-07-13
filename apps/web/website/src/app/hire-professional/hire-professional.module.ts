import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HireProfessionalRoutingModule } from './hire-professional-routing.module';
import { HireProfessionalMainComponent } from './hire-professional-main/hire-professional-main.component';
import { BookSessionModule } from './modules/book-session/book-session.module';
import { ProjectsListModule } from './modules/projects-list/projects-list.module';
import { ReviewProposalsModule } from './modules/review-proposals/review-proposals.module';
import { CommunicateWithProfessionalsModule } from './modules/communicate-with-professionals/communicate-with-professionals.module';
import { HiringStepsModule } from './modules/hiring-steps/hiring-steps.module';
import { ProjectFeedbackModule } from './modules/project-feedback/project-feedback.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MembersListModule } from './modules/members-list/members-list.module';


@NgModule({
  declarations: [
    HireProfessionalMainComponent
  ],
  imports: [
    CommonModule,
    HireProfessionalRoutingModule,
    BookSessionModule,
    ProjectsListModule,
    ReviewProposalsModule,
    CommunicateWithProfessionalsModule,
    HiringStepsModule,
    ProjectFeedbackModule,
    PaymentModule,
    MembersListModule
  ]
})
export class HireProfessionalModule { }
