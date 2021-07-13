import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { CommunicationMethodsDto } from './dto/communication-methods.dto';
import { CommnuicationMethodsService } from './services/communication-methods.service';

@Controller('create-project')
export class CommnicationMethosController {
  constructor(
    private communicationMethodsService: CommnuicationMethodsService
  ) {}
  @UseGuards(JwtGaurdService)
  @Put('communication-methods')
  async createCommunicationMethods(
    @Body() communicationDto: CommunicationMethodsDto
  ) {
    const commnuicationData = await this.communicationMethodsService.createUpdateCommunication(
      communicationDto
    );

    return {
      response: commnuicationData,
    };
  }
}
