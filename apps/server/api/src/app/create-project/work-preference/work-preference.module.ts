import { Module } from '@nestjs/common';
import { JwtModule, RedisModule, RedisService } from '@prohub/database-core';
import {
  CreateProjectSchemaModule,
  WorkPreferenceSchemaModule,
} from '@prohub/database-schema';
import { CreateProjectService } from '../service/create-project.service';
import { WorkPreferenceService } from './services/work-preference.service';
import { WorkPreferenceController } from './work-preference.controller';

@Module({
  imports: [
    JwtModule,
    RedisModule,
    CreateProjectSchemaModule,
    WorkPreferenceSchemaModule,
  ],
  controllers: [WorkPreferenceController],
  providers: [
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
    CreateProjectService,
    WorkPreferenceService,
  ],
})
export class WorkPreferenceModule {}
