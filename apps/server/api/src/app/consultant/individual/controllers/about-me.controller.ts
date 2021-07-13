import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';

import { JwtGaurdService } from '@prohub/database-core';
import { AboutMeDto } from '../dto/about-me.sto';
import { AboutMeService } from '../services/about-me.service';

@Controller('consultant-individual-profile')
export class AboutMeController {
  constructor(private aboutMeService: AboutMeService) {}

  @UseGuards(JwtGaurdService)
  @Put('about-me')
  async aboutMe(@Body() aboutMe: AboutMeDto, @Req() req) {
    const result = this.aboutMeService.updateToAboutMe({
      aboutMe,
      userCred: req.userCred,
    });

    return result;
  }

  @UseGuards(JwtGaurdService)
  @Get('about-me')
  async getUploadedCv(@Req() req) {
    const result = await this.aboutMeService.getAboutMe(req.userCred);
    return {
      response: result,
    };
  }
}
