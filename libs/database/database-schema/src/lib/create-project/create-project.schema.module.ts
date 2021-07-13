import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateProject, CreateProjectSchema } from './create-project.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: CreateProject.name,
      schema: CreateProjectSchema,
    },
  ]),
];
@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class CreateProjectSchemaModule {}
