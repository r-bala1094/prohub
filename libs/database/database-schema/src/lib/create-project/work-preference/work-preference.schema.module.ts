import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkPreference, WorkPreferenceSchema } from './work-preference.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: WorkPreference.name,
      schema: WorkPreferenceSchema,
    },
  ]),
];

@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class WorkPreferenceSchemaModule {}
