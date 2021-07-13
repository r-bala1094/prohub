import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  categoryId?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  subCategoryId?: string;

  @Prop({ type: String })
  skill?: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
