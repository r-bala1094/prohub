import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type BasicInfoUploadFileDocument = BasicInfoUploadFile & Document;

@Schema()
export class BasicInfoUploadFile {
  @Prop({ required: true, type: String })
  ETag?: string;

  @Prop({ required: true, type: String })
  fileName?: string;

  @Prop({ required: true, type: String })
  fileLocation?: string;

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId })
  userId?: Types.ObjectId;

  @Prop({ required: true, type: Date })
  createAt?: Date;

  @Prop({ required: true, type: Date })
  modifiedAt?: Date;
}

export const BasicInfoUploadFileSchema = SchemaFactory.createForClass(
  BasicInfoUploadFile
);
