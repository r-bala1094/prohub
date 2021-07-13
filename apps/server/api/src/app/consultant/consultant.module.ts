import { Module } from '@nestjs/common';
import { IndividualProfile } from './individual/individual.module';

@Module({
  imports: [IndividualProfile],
})
export class ConsultantModule {}
