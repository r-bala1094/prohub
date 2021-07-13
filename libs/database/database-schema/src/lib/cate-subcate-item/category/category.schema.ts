import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { tranformQuery } from '../../query-util/dataset-transform';
export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  // @Prop({ type: MongooseSchema.Types.ObjectId })
  // categoryId?: string;
  _id?: string;

  categoryId?: string;

  @Prop({ type: String })
  category?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// tranformQuery(CategorySchema, 'categoryId', '_id');
