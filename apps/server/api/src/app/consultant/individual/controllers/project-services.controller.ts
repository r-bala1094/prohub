import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtGaurdService } from '@prohub/database-core';
import { UserCredentialsRequest } from '@prohub/interfaces';
import { ProjectAndServiceDto } from '../dto/project-service.dto';

import { ProjectAndServiceService } from '../services/project-services.service';

@Controller('consultant-individual-profile')
export class ProjectAndServiceController {
  constructor(private projectAndService: ProjectAndServiceService) {}

  /** upload Image */

  @UseGuards(JwtGaurdService)
  @Post('project-service-upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileOfProjectAndService(
    @UploadedFile()
    file: { [key: string]: string | Buffer },
    @Req() req: UserCredentialsRequest
  ) {
    try {
      const { userCred } = req;
      /** now upload files */
      const { flag, data } = (await this.projectAndService.uploadFiles(
        userCred,
        file
      )) as { flag; data };

      if (!flag) {
        throw 'Error in Uploading File.';
      }

      return {
        response: {
          message: 'Files Uploaded Successfully.',
          status: true,
          statusCode: 200,
          data: data,
        },
      };
    } catch (err) {
      return {
        response: {
          message: err,
          status: false,
          statusCode: 405,
          data: null,
        },
      };
    }
  }

  /** save or create Data in project service */
  @UseGuards(JwtGaurdService)
  @Put('project-service')
  async createOrUpdateProjectAndService(
    @Body() projectAndServiceDto: ProjectAndServiceDto,
    @Req() req: UserCredentialsRequest
  ) {
    try {
      const { userCred } = req;

      const result = await this.projectAndService.createOrUpdateProjectAndServie(
        projectAndServiceDto,
        userCred
      );

      return {
        response: {
          message: 'Project And Service Saved Successfully.',
          status: true,
          statusCode: true,
          data: {
            projectAndServiceId: result,
          },
        },
      };
    } catch (err) {
      return {
        response: {
          response: 'Error in Saving Project And Service.',
          status: false,
          statusCode: 404,
          data: null,
        },
      };
    }
  }

  /** save or create Data in project service */
  @UseGuards(JwtGaurdService)
  @Get('project-service-list')
  async getProjectAndServiceList(@Req() req: UserCredentialsRequest) {
    try {
      const { userCred } = req;

      const result = await this.projectAndService.getProjectAndServiceList(
        userCred
      );

      return {
        response: {
          message: 'Project And Service List Fetched Successfully.',
          status: true,
          statusCode: true,
          data: result,
        },
      };
    } catch (err) {
      return {
        response: {
          message: 'Error in Fetching Project And Service List.',
          status: true,
          statusCode: true,
          data: null,
        },
      };
    }
  }

  /** save or create Data in project service */
  @UseGuards(JwtGaurdService)
  @Get('project-service')
  async getProjectAndService(
    @Req() req: UserCredentialsRequest,
    @Query() query: { where: { projectAndServiceId: string } }
  ) {
    try {
      const { userCred } = req;
      const { where } = query;
      const result = await this.projectAndService.getProjectAndService(
        userCred,
        where
      );

      return {
        response: {
          message: 'Fetching Project And Service Successfully.',
          status: true,
          statusCode: true,
          data: result,
        },
      };
    } catch (err) {
      return {
        response: {
          response: 'Error in Fetching Project And Service.',
          status: false,
          statusCode: 404,
          data: null,
        },
      };
    }
  }
}
