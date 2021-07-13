import { IsArray } from 'class-validator';

export class CategoryAndSkillsDto {
  profileId: string;

  @IsArray()
  categories: Array<{
    categoryId: string;
    category: string;
  }>;
  @IsArray()
  subCategories: Array<{
    categoryId: string;
    subCategory: string;
    subCategoryId: string;
  }>;
  @IsArray()
  skills: Array<{
    categoryId: string;
    subCategoryId: string;
    skill: string;
    skillId: string;
  }>;
}
