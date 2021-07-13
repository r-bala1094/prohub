import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Communication, CommunicationSchema } from './communication.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: Communication.name,
      schema: CommunicationSchema,
    },
  ]),
];

@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class CommnuicationSchemaModule {}
