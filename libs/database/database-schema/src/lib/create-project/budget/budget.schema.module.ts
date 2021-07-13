import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Budget, BudgetSchema } from './budget.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: Budget.name,
      schema: BudgetSchema,
    },
  ]),
];

@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class BudgetSchemaModule {}
