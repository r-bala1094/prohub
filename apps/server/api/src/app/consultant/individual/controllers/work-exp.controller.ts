import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtGaurdService } from '@prohub/database-core';

import { WorkExpDto } from '../dto/work-exp.dto';
import { WorkExperienceService } from '../services/work-exp.service';

@Controller('consultant-individual-profile')
export class WorkExperienceController {
  constructor(private workExperience: WorkExperienceService) {}

  @UseGuards(JwtGaurdService)
  @Put('work-experience')
  async createUpdateWorkExp(@Body() workExp: WorkExpDto, @Req() req) {
    const result = await this.workExperience.updateCreateWorkExp(
      workExp,
      req.userCred
    );

    return {
      response: {
        status: 200,
        statusCode: 200,
        message: 'Work Exp. Updated successfully',
        data: result,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('work-experience')
  async getWorkedExp(@Req() req) {
    const result = await this.workExperience.getWorkedExp(req.userCred);
    return {
      response: {
        status: 200,
        statusCode: 200,
        message: 'Work Exp. Fetched successfully',
        data: result,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Delete('work-experience')
  async deleteWorkExp(
    @Query() query: { workExperienceId: string },
    @Req() req
  ) {
    const result = await this.workExperience.deleteWorkExp(req.userCred, query);
    return {
      response: {
        status: result,
        statusCode: 200,
        message: result
          ? 'Work Exp. Deleted successfully'
          : 'Error in Deletem Work Exp.',
        data: result ? true : null,
      },
    };
  }
}
