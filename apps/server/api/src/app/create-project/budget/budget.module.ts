import { Module } from '@nestjs/common';
import { JwtModule, RedisModule, RedisService } from '@prohub/database-core';
import {
  BudgetSchemaModule,
  CreateProjectSchemaModule,
} from '@prohub/database-schema';
import { CreateProjectService } from '../service/create-project.service';
import { BudgetController } from './budget.controller';
import { BudgetService } from './services/budget.service';

@Module({
  imports: [
    JwtModule,
    RedisModule,
    CreateProjectSchemaModule,
    BudgetSchemaModule,
  ],
  controllers: [BudgetController],
  providers: [
    BudgetService,
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
    CreateProjectService,
  ],
})
export class BudgetModule {}
