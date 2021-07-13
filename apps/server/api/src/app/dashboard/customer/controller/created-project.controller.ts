import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { CreateProjectService } from '../../../create-project/service/create-project.service';

@Controller('dashboard')
export class CreatedProjectController {
  constructor(private createProjectService: CreateProjectService) {}

  @UseGuards(JwtGaurdService)
  @Get('created-project-list')
  async getCreatedProjectLists(@Req() req) {
    try {
      const projectRefList = await this.createProjectService.getCreatedProjectLists(
        req.userCred
      );

      return {
        response: {
          message: 'Created Project Fetched Successfully.',
          status: true,
          statusCode: 200,
          data: projectRefList,
        },
      };
    } catch (err) {
      return {
        response: {
          message: 'Created Project not Fetched.',
          status: false,
          statusCode: 404,
          data: null,
        },
      };
    }
  }
}
