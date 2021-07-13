import { HttpModule, Module } from '@nestjs/common';

import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { UserSchemaModule } from '@prohub/database-schema';
import { JwtModule, RedisModule } from '@prohub/database-core';
import { LoginService } from '../login/login.service';

@Module({
  imports: [UserSchemaModule, HttpModule, JwtModule, RedisModule],
  controllers: [SignupController],
  providers: [SignupService, LoginService],
  exports: [],
})
export class SignupModule {}
