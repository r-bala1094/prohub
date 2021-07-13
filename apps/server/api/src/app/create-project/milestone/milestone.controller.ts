import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { MilestoneDto } from './dto/milestone.dto';
import { MilestoneService } from './services/milestone.service';

@Controller('create-project')
export class MilestoneController {
  constructor(private milestoneService: MilestoneService) {}
  @UseGuards(JwtGaurdService)
  @Get('milestone')
  async getMilestone(@Query() query: { projectId: string }) {
    /**/

    try {
      const milestones = await this.milestoneService.getMilestone(
        query.projectId
      );
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Milestone List fetched Successfully.',
          data: milestones,
        },
      };
    } catch (err) {
      return {
        response: {
          message: 'not Fetched',
          status: false,
          statusCode: 404,
          data: null,
        },
      };
    }
  }

  @UseGuards(JwtGaurdService)
  @Put('milestone')
  async createMilestone(@Body() milestoneDto: MilestoneDto) {
    /**/
    try {
      const milestone = await this.milestoneService.createUpdateMilestone(
        milestoneDto
      );
      return {
        response: milestone,
      };
    } catch (err) {
      /** */
    }
  }

  /** DELETE Milestone*/

  @UseGuards(JwtGaurdService)
  @Delete('milestone')
  async deleteMilestone(
    @Query() milestoneDto: { milestoneId: string; projectId: string }
  ) {
    /**/
    try {
      const milestone = await this.milestoneService.deleteMilestone(
        milestoneDto
      );
      return {
        response: {
          message: 'Milestone deleted Successfully.',
          status: true,
          statusCode: 204,
          data: milestone,
        },
      };
    } catch (err) {
      return {
        response: {
          message: 'Error in deleting.',
          status: true,
          statusCode: 204,
          data: null,
        },
      };
      /** */
    }
  }
}
