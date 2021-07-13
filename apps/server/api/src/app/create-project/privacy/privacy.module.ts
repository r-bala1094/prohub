import { Module } from '@nestjs/common';
import { JwtModule, RedisModule, RedisService } from '@prohub/database-core';
import {
  CreateProjectSchemaModule,
  PrivacySchemaModule,
} from '@prohub/database-schema';
import { CreateProjectService } from '../service/create-project.service';
import { PrivacyController } from './privacy.controller';
import { PrivacyService } from './services/privacy.service';
@Module({
  imports: [
    JwtModule,
    RedisModule,
    CreateProjectSchemaModule,
    PrivacySchemaModule,
  ],
  controllers: [PrivacyController],
  providers: [
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
    CreateProjectService,
    PrivacyService,
  ],
})
export class PrivacyModule {}
