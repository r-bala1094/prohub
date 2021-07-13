import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrivacyProject, PrivacyProjectSchema } from './privacy.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: PrivacyProject.name,
      schema: PrivacyProjectSchema,
    },
  ]),
];

@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class PrivacySchemaModule {}
