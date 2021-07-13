import { Module } from '@nestjs/common';
import { GaurdsModule, RedisModule, RedisService } from '@prohub/database-core';
import {
  CreateProjectSchemaModule,
  ProjectPreferenceSchemaModule,
} from '@prohub/database-schema';
import { CreateProjectService } from '../service/create-project.service';
import { ProjectPreferenceController } from './projecr-preference.controller';
import { ProjectPreferenceService } from './services/project-preference.service';

@Module({
  imports: [
    ProjectPreferenceSchemaModule,
    GaurdsModule,
    RedisModule,
    CreateProjectSchemaModule,
  ],
  providers: [
    CreateProjectService,
    ProjectPreferenceService,
    { provide: 'REDIS', useClass: RedisService },
  ],
  controllers: [ProjectPreferenceController],
})
export class ProjectPreferenceModule {}
