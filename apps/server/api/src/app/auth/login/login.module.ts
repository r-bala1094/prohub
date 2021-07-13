import { Module } from '@nestjs/common';

// import { JwtVerificationModule } from '@prohub/database-core';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserSchemaModule } from '@prohub/database-schema';
import { JwtModule, RedisModule } from '@prohub/database-core';
@Module({
  imports: [UserSchemaModule, JwtModule, RedisModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
