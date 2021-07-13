import { Body, Controller, Put } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { ItemDto } from '../dto/item.dto';
import { SubcategoryDto } from '../dto/subcategory.dto';
import { CategoryService } from '../service/category.service';

@Controller('save-list')
export class SaveController {
  constructor(private categoryService: CategoryService) {}
  @Put('category')
  async saveCategory(@Body() category: Array<CategoryDto>) {
    /** */
    try {
      return this.categoryService.saveCategoryList(category);
    } catch (err) {
      return false;
    }
  }

  @Put('subcategory')
  async saveSubategory(@Body() subCategory: Array<SubcategoryDto>) {
    /** */
    try {
      return this.categoryService.saveSubcategoryList(subCategory);
    } catch (err) {
      return false;
    }
  }

  @Put('item')
  async saveItemList(@Body() itemList: Array<ItemDto>) {
    try {
      return this.categoryService.saveItemList(itemList);
    } catch (err) {
      /** */
    }
  }

  @Put('deliverable')
  async saveDeliverableList(@Body() deliverableList: Array<ItemDto>) {
    try {
      return this.categoryService.saveDeliverableListList(deliverableList);
    } catch (err) {
      /** */
    }
  }
}
