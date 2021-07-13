import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { BasicInfoMainComponent } from './basic-info-main/basic-info-main.component';
import { TitleProjectComponent } from './basic-info-main/title-project/title-project.component';
import { WebMaterialModule } from '../../../../../../../../libs/web/material/src';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpertsCountComponent } from './basic-info-main/experts-count/experts-count.component';
import { LocalExpertComponent } from './basic-info-main/local-expert/local-expert.component';
import { CategoriesSkillsComponent } from './basic-info-main/categories-skills/categories-skills.component';
import { ObjectivesDeliverablesComponent } from './basic-info-main/objectives-deliverables/objectives-deliverables.component';
import { DescriptionAttachmentComponent } from './basic-info-main/description-attachment/description-attachment.component';
import { ScreeningQuestionsComponent } from './basic-info-main/screening-questions/screening-questions.component';
import { DndDirective } from './basic-info-main/directives/dnd.directive';
import { AddQuestionsComponent } from './basic-info-main/screening-questions/add-questions/add-questions.component';

@NgModule({
  declarations: [BasicInfoMainComponent, TitleProjectComponent, ExpertsCountComponent, LocalExpertComponent, CategoriesSkillsComponent, ObjectivesDeliverablesComponent, DescriptionAttachmentComponent, ScreeningQuestionsComponent, DndDirective, AddQuestionsComponent],
  imports: [CommonModule, BasicInfoRoutingModule, WebMaterialModule, ReactiveFormsModule],
})
export class BasicInfoModule {}
