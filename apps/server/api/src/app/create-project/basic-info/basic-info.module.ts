import { Module } from '@nestjs/common';
import {
  AwsS3Module,
  GaurdsModule,
  RedisModule,
  RedisService,
} from '@prohub/database-core';
import { BasicInfoImagesSchemaModule } from '@prohub/database-schema';
import { CreateProjectSchemaModule } from '@prohub/database-schema';
import { CreateProjectService } from '../service/create-project.service';
import { BasicInfoController } from './basic-info.controller';
import { BasicInfoService } from './services/basic-info.service';
import { ImageUploadService } from './services/image-upload.service';
import { BasicInfoSaveService } from './services/save-file.service';

@Module({
  imports: [
    AwsS3Module,
    BasicInfoImagesSchemaModule,
    GaurdsModule,
    RedisModule,
    CreateProjectSchemaModule,
  ],
  controllers: [BasicInfoController],
  providers: [
    ImageUploadService,
    BasicInfoSaveService,
    BasicInfoService,
    CreateProjectService,
    { provide: 'REDIS', useClass: RedisService },
  ],
})
export class BasicInfoModule {}
