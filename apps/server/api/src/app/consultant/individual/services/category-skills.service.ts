import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CategoryAndSkills,
  CategoryAndSkillsDocument,
  ConsultantIndividualProfile,
  ConsultantIndividualProfileDocument,
} from '@prohub/database-schema';
import { UserCredentials } from '@prohub/interfaces';
import { Model, Types } from 'mongoose';
import { CategoryAndSkillsDto } from '../dto/category-skills.dto';

@Injectable()
export class CategoryAndSkillsService {
  constructor(
    @InjectModel(CategoryAndSkills.name)
    private categoryAndSkillsModel: Model<CategoryAndSkillsDocument>,
    @InjectModel(ConsultantIndividualProfile.name)
    private consultantIndividualProfile: Model<ConsultantIndividualProfileDocument>
  ) {}
  /**
   * update category and skill into customer profile
   */

  async categoryAndSkill(
    categoryAndSkillsDto: CategoryAndSkillsDto,
    userCredentials: UserCredentials
  ) {
    /** it is compulsory */

    const { _id } = userCredentials;
    categoryAndSkillsDto.profileId = _id;

    /** check for update */
    try {
      const flagForUpdateOrCreate = await this.checkForExists(_id);

      if (!flagForUpdateOrCreate) {
        const lastInsertedId = await this.createCategoryAndSkill(
          categoryAndSkillsDto
        );

        /** update main document Coustomer ConsultantIndividualProfile */

        await this.updateParentDocument(lastInsertedId, _id);

        return true;
      } else {
        /** only update the document of the  */
        await this.updateCategoryAndSkills(categoryAndSkillsDto, _id);

        return true;
      }
    } catch (err) {
      throw false;
    }
  }

  async checkForExists(id: string) {
    try {
      const existsCategorySkills = await this.categoryAndSkillsModel
        .find({ profileId: id })
        .exec();

      if (!existsCategorySkills.length) {
        return false;
      }
      return true;
    } catch (err) {
      throw null;
    }
  }

  async createCategoryAndSkill(categoryAndSkillsDto: CategoryAndSkillsDto) {
    try {
      /** create document sparating */
      const categoryAndSkill = new this.categoryAndSkillsModel(
        categoryAndSkillsDto
      );

      /** get the last inserted Id and save document */

      const { _id } = await categoryAndSkill.save();
      /** category inserted id */
      return _id;
    } catch (err) {
      throw null;
    }
  }

  /**
   * update the parent docuent if newly inserted document
   */
  async updateParentDocument(lastInsertedId: any, id: string) {
    try {
      await this.consultantIndividualProfile.updateOne(
        { consultantUserId: id },
        {
          $set: {
            categoryAndSkillsId: lastInsertedId,
          },
        }
      );

      return true;
    } catch (err) {
      throw null;
    }
  }

  async updateCategoryAndSkills(
    categoryAndSkillsDto: CategoryAndSkillsDto,
    id: string
  ) {
    try {
      await this.categoryAndSkillsModel.updateOne(
        { profileId: id },
        categoryAndSkillsDto
      );

      return true;
    } catch (err) {
      throw null;
    }
  }

  /**
   * get category and skills
   */

  async getCategoryAndSkills(userCredentials: UserCredentials) {
    try {
      const { _id } = userCredentials;
      const data = await this.categoryAndSkillsModel
        .find(
          { profileId: _id },
          { categories: 1, subCategories: 1, skills: 1, _id: 0 }
        )
        .exec();

      return (data || [])[0] || {};
    } catch (err) {
      throw false;
    }
  }
}
