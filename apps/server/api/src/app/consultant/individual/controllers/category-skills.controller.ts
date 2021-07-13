import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { CategoryAndSkillsDto } from '../dto/category-skills.dto';
import { CategoryAndSkillsService } from '../services/category-skills.service';
import { UserCredentialsRequest } from '@prohub/interfaces';

@Controller('consultant-individual-profile')
export class CategoryAndSkills {
  constructor(private categoryAndSkillsService: CategoryAndSkillsService) {
    /** */
  }

  /**
   * get  category and Skills
   */
  @UseGuards(JwtGaurdService)
  @Get('category-skills')
  async getCategoryAndSkills(@Req() req: UserCredentialsRequest) {
    /** */

    try {
      const { userCred } = req;

      /**
       * save incomming data
       */
      const data = await this.categoryAndSkillsService.getCategoryAndSkills(
        userCred
      );

      return {
        response: {
          message: 'Category and Skills saved Successfully',
          status: true,
          statusCode: 201,
          data: data,
        },
      };
    } catch (err) {
      return {
        response: {
          message: 'Error in updating',
          status: false,
          statusCode: 404,
          data: null,
        },
      };
    }
  }
  /**
   * Put Category and sub category  skills
   */

  @UseGuards(JwtGaurdService)
  @Put('category-skills')
  async updateCategoryAndSkills(
    @Body() categoryAndSkillsDto: CategoryAndSkillsDto,
    @Req() req: UserCredentialsRequest
  ) {
    /** */
    try {
      const { userCred } = req;

      /**
       * save incomming data
       */
      await this.categoryAndSkillsService.categoryAndSkill(
        categoryAndSkillsDto,
        userCred
      );

      return {
        response: {
          message: 'Category and Skills saved Successfully',
          status: true,
          statusCode: 201,
          data: true,
        },
      };
    } catch (err) {
      return {
        response: {
          message: 'Error in updating',
          status: false,
          statusCode: 404,
          data: null,
        },
      };
    }
  }
}
