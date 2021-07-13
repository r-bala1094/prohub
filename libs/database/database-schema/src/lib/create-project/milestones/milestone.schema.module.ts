import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Milestone, MilestoneSchema } from './milestone.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: Milestone.name,
      schema: MilestoneSchema,
    },
  ]),
];

@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class MilestoneSchemaModule {}
