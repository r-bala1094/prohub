import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Category,
  CategoryDocument,
  Deliverable,
  DeliverableDocument,
  Item,
  ItemDocument,
  Subcategory,
  SubcategoryDocument,
} from '@prohub/database-schema';
import { Model } from 'mongoose';
import { CategoryDto } from '../dto/category.dto';
import { ItemDto } from '../dto/item.dto';
import { SubcategoryDto } from '../dto/subcategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Subcategory.name)
    private subcategoryModel: Model<SubcategoryDocument>,

    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Deliverable.name)
    private deliverableModel: Model<DeliverableDocument>
  ) {}

  async saveCategoryList(categoryList: Array<CategoryDto>) {
    /** save direct to db */
    try {
      return await this.categoryModel.insertMany(categoryList);
    } catch (err) {
      /** */
    }
  }

  async saveSubcategoryList(subCategory: Array<SubcategoryDto>) {
    try {
      return await this.subcategoryModel.insertMany(subCategory);
    } catch (err) {
      /** */
    }
  }
  async saveItemList(itemList: Array<ItemDto>) {
    try {
      return await this.itemModel.insertMany(itemList);
    } catch (err) {
      /** */
    }
  }

  async saveDeliverableListList(itemList: Array<ItemDto>) {
    try {
      return await this.deliverableModel.insertMany(itemList);
    } catch (err) {
      /** */
    }
  }
}
