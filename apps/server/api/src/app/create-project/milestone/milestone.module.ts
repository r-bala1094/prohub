import { Module } from '@nestjs/common';
import { JwtModule, RedisModule, RedisService } from '@prohub/database-core';
import {
  BudgetSchemaModule,
  MilestoneSchemaModule,
} from '@prohub/database-schema';

import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './services/milestone.service';

@Module({
  imports: [JwtModule, RedisModule, MilestoneSchemaModule, BudgetSchemaModule],
  controllers: [MilestoneController],
  providers: [
    {
      provide: 'REDIS',
      useClass: RedisService,
    },

    MilestoneService,
  ],
})
export class MilestoneModule {}
