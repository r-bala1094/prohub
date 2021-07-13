import { Module } from '@nestjs/common';
import { GetListModule } from './get/get.module';
import { SaveModule } from './save/save.module';

@Module({
  imports: [SaveModule, GetListModule],
})
export class CateSubcateItemModule {}
