import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthController } from './controller/auth.controller';

@Module({
  controllers: [AuthController]
})
export class AuthModule {}
