import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type CategoryAndSkillsDocument = CategoryAndSkills & Document;

@Schema()
export class CategoryAndSkills {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  profileId?: string;

  @Prop({
    type: [
      {
        _id: false,
        categoryId: String,
        category: String,
      },
    ],
  })
  categories?: Array<{ category: string; categoryId: string }>;

  @Prop({
    type: [
      {
        _id: false,
        categoryId: String,
        subCategoryId: String,
        subCategory:String
      },
    ],
  })
  subCategories?: Array<{
    subCategory: string;
    categoryId: string;
    subCategoryId: string;
  }>;

  @Prop({
    type: [
      {
        _id: false,
        skill: String,
        skillId: String,
        categoryId: String,
        subCategoryId: String,
      },
    ],
  })
  skills?: Array<{
    skill: string;
    skillId: string;
    categoryId: string;
    subCategoryId: string;
  }>;
}

export const CategoryAndSkillsSchema = SchemaFactory.createForClass(
  CategoryAndSkills
);
