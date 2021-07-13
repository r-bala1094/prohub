import { Module } from '@nestjs/common';
import { JwtModule, RedisModule, RedisService } from '@prohub/database-core';
import { CategorySubcategoryItemSchemaModule } from '@prohub/database-schema';
import { Back4AppService } from '../../services/back4app/back4app.service';
import { GetListController } from './controllers/get-list.controller';
import { GetListService } from './service/get-list.service';

@Module({
  imports: [CategorySubcategoryItemSchemaModule, RedisModule, JwtModule],
  controllers: [GetListController],
  providers: [
    { provide: 'REDIS', useClass: RedisService },
    GetListService,
    Back4AppService,
  ],
})
export class GetListModule {}
