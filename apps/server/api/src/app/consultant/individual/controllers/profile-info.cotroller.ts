import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGaurdService } from '@prohub/database-core';
import { ProfileInfoDto } from '../dto/profile-info.dto';

import { ProfileInfoService } from '../services/profile-info.service';

@Controller('consultant-individual-profile')
export class ProfileInfoController {
  /** upload Image */

  constructor(private profileInfoService: ProfileInfoService) {}

  @UseGuards(JwtGaurdService)
  @Put('profile-info')
  @UseInterceptors(FileInterceptor('file'))
  async profileInfo(
    @UploadedFile() file: { [key: string]: string | Buffer },
    @Body() profileInfo: ProfileInfoDto,
    @Req() req
  ) {
    const result = await this.profileInfoService.updateToProfile({
      file,
      profileInfo,
      userCred: req.userCred,
    });

    return { response: result };
  }

  @UseGuards(JwtGaurdService)
  @Get('profile-info')
  async getUploadedCv(@Req() req) {
    const result = await this.profileInfoService.getProfileInfo(req.userCred);
    return {
      response: result,
    };
  }
}
