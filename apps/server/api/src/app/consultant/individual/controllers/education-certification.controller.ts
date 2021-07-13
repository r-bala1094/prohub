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

import { EduCertDto } from '../dto/education-certification.dto';
import { EducationCertificationService } from '../services/education-certification.service';

@Controller('consultant-individual-profile')
export class EducationCertificationController {
  constructor(private eduCertiService: EducationCertificationService) {}

  @UseGuards(JwtGaurdService)
  @Put('education-certification')
  async eduCert(@Body() eduCertDto: EduCertDto, @Req() req) {
    const result = await this.eduCertiService.updateCreateEduCert(
      eduCertDto,
      req.userCred
    );

    return {
      response: {
        status: 200,
        statusCode: 200,
        message: 'Education Certification Updated successfully',
        data: result,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('education-certification')
  async getEduCert(@Req() req) {
    const result = await this.eduCertiService.getEduCert(req.userCred);
    return {
      response: {
        status: 200,
        statusCode: 200,
        message: 'Education Certification fetched successfully',
        data: result,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Delete('education-certification')
  async deleteEduCert(@Req() req, @Query() query: { id: string }) {
    const result = await this.eduCertiService.deleteEduCert(
      req.userCred,
      query
    );
    return {
      response: {
        status: 200,
        statusCode: 200,
        message: 'Education Certification Delete successfully',
        data: true,
      },
    };
  }
}
