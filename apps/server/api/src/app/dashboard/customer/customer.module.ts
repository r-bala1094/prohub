import { Module } from '@nestjs/common';
import { JwtModule, RedisModule, RedisService } from '@prohub/database-core';
import { CreateProjectSchemaModule } from '@prohub/database-schema';
import { CreateProjectService } from '../../create-project/service/create-project.service';
import { CreatedProjectController } from './controller/created-project.controller';

@Module({
  imports: [JwtModule, RedisModule, CreateProjectSchemaModule],
  controllers: [CreatedProjectController],
  providers: [
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
    CreateProjectService,
  ],
})
export class CustomerModule {}
