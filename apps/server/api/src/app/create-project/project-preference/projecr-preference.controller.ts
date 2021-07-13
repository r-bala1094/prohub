import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { ProjectPreferenceDto } from './dto/project-preference.dto';
import { ProjectPreferenceService } from './services/project-preference.service';

@Controller('create-project')
export class ProjectPreferenceController {
  constructor(private projectPreferenceService: ProjectPreferenceService) {}
  @UseGuards(JwtGaurdService)
  @Put('project-preference')
  async createProjectPreference(
    @Body() projectPreferenceDto: ProjectPreferenceDto
  ) {
    const projecPrefData = await this.projectPreferenceService.createUpdateProjectPreference(
      projectPreferenceDto
    );

    return {
      response: projecPrefData,
    };
  }
}
