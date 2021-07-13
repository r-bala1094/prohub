import { Module } from '@nestjs/common';
import { JwtModule, RedisModule, RedisService } from '@prohub/database-core';
import {
  CommnuicationSchemaModule,
  CreateProjectSchemaModule,
} from '@prohub/database-schema';

import { CreateProjectService } from '../service/create-project.service';
import { CommnicationMethosController } from './communication-methods.controller';
import { CommnuicationMethodsService } from './services/communication-methods.service';

@Module({
  imports: [
    JwtModule,
    RedisModule,
    CreateProjectSchemaModule,
    CommnuicationSchemaModule,
  ],
  controllers: [CommnicationMethosController],
  providers: [
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
    CreateProjectService,
    CommnuicationMethodsService,
  ],
})
export class CommnuicationMethodsModule {}
