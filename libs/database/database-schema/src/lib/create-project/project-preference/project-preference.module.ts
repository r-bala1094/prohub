import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProjectPreference,
  ProjectPreferenceSchema,
} from './project-preference.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: ProjectPreference.name,
      schema: ProjectPreferenceSchema,
    },
  ]),
];

@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class ProjectPreferenceSchemaModule {}
