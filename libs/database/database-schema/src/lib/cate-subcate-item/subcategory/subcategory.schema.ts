import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
// import { tranformQuery } from '../../query-util/dataset-transform';

export type SubcategoryDocument = Subcategory & Document;

@Schema()
export class Subcategory {
  _id?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  categoryId?: string;

  subCategoryId?: string;

  @Prop({ type: String })
  subCategory?: string;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);

// tranformQuery(SubcategorySchema, 'subCategoryId', '_id');
