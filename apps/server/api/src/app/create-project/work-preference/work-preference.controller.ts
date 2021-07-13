import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { WorkPreferenceDto } from './dto/work-preference.dto';
import { WorkPreferenceService } from './services/work-preference.service';

@Controller('create-project')
export class WorkPreferenceController {
  constructor(private workPreferenceService: WorkPreferenceService) {}
  @UseGuards(JwtGaurdService)
  @Put('work-preference')
  async createUpdateWorkPreference(
    @Body() workPreferenceDto: WorkPreferenceDto
  ) {
    /** */
    const workPreferenceData = await this.workPreferenceService.createUpdatePrivacy(
      workPreferenceDto
    );

    return {
      response: workPreferenceData,
    };
  }
}
