import { Module } from '@nestjs/common';

import { JwtModule } from '../jwt/jwt.module';
import { JwtGaurdService } from './auth.gaurds';
import { RedisService } from '../redis/redis.service';
import { RedisModule } from '../redis/redis.module';
@Module({
  imports: [JwtModule, RedisModule],
  providers: [
    JwtGaurdService,
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
  ],
  exports: [JwtGaurdService],
})
export class GaurdsModule {}
