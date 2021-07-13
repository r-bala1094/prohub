import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category/category.schema';
import {
  Deliverable,
  DeliverableSchema,
} from './deliverable/deliverable.schema';
import { Item, ItemSchema } from './item/item.schema';
import { Language, LanguageSchema } from './language/language.schema';
import {
  Subcategory,
  SubcategorySchema,
} from './subcategory/subcategory.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: Category.name,
      schema: CategorySchema,
    },
    {
      name: Item.name,
      schema: ItemSchema,
    },
    {
      name: Subcategory.name,
      schema: SubcategorySchema,
    },
    {
      name: Deliverable.name,
      schema: DeliverableSchema,
    },
    {
      name: Language.name,
      schema: LanguageSchema,
    },
  ]),
];
@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class CategorySubcategoryItemSchemaModule {}
