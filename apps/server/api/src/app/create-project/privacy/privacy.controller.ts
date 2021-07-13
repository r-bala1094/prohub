import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { PrivacyDto } from './dto/privacy.dto';
import { PrivacyService } from './services/privacy.service';

@Controller('create-project')
export class PrivacyController {
  constructor(private privacyService: PrivacyService) {}

  @UseGuards(JwtGaurdService)
  @Put('privacy')
  async createOrUpdatePrivacy(@Body() privacyDto: PrivacyDto) {
    const projecPrefData = await this.privacyService.createUpdatePrivacy(
      privacyDto
    );

    return {
      response: projecPrefData,
    };
  }
}
