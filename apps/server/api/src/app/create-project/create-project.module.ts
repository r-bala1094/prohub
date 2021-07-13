import { Module } from '@nestjs/common';
import { JwtModule, RedisModule, RedisService } from '@prohub/database-core';
import { CreateProjectSchemaModule } from '@prohub/database-schema';
import { BasicInfoModule } from './basic-info/basic-info.module';
import { BudgetModule } from './budget/budget.module';
import { CommnuicationMethodsModule } from './communication-methods/communication-methods.module';
import { CreateProjectController } from './create-project.controller';
import { MilestoneModule } from './milestone/milestone.module';
import { PrivacyModule } from './privacy/privacy.module';
import { ProjectPreferenceModule } from './project-preference/project-proference.module';
import { CreateProjectService } from './service/create-project.service';
import { WorkPreferenceModule } from './work-preference/work-preference.module';

@Module({
  imports: [
    BasicInfoModule,
    JwtModule,
    RedisModule,
    CreateProjectSchemaModule,
    ProjectPreferenceModule,
    PrivacyModule,
    CommnuicationMethodsModule,
    BudgetModule,
    MilestoneModule,
    WorkPreferenceModule,
  ],
  controllers: [CreateProjectController],
  providers: [
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
    CreateProjectService,
  ],
})
export class CreateProjectModule {}
