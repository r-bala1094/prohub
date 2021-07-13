import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGaurdService } from '@prohub/database-core';
import { UploadCvDto } from '../dto/uploadCv.dto';
import { UploadCvService } from '../services/uploadCv.service';

@Controller('consultant-individual-profile')
export class uploadCvController {
  /** upload Image */

  constructor(private uploadCvService: UploadCvService) {}

  @UseGuards(JwtGaurdService)
  @Post('uploadCv')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadCv(
    @UploadedFiles() files: Array<{ [key: string]: string | Buffer }>,
    @Body() cvImportType: UploadCvDto,
    @Req() req
  ) {
    const result = await this.uploadCvService.updateToProfile({
      files,
      cvImportType,
      userCred: req.userCred,
    });

    return { response: result };
  }

  @UseGuards(JwtGaurdService)
  @Get('get-uploaded-cv')
  async getUploadedCv(@Req() req) {
    const result = await this.uploadCvService.getUploadedCv(req.userCred);
    return {
      response: result,
    };
  }
}
