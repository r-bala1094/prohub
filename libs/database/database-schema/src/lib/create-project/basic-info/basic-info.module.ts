import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicInfo, BasicInfoSchema } from './basic-info.schema';
import {
  BasicInfoUploadFile,
  BasicInfoUploadFileSchema,
} from './upload-file.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: BasicInfoUploadFile.name,
      schema: BasicInfoUploadFileSchema,
    },
    {
      name: BasicInfo.name,
      schema: BasicInfoSchema,
    },
  ]),
];
@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class BasicInfoImagesSchemaModule {}
