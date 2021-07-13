import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';

@Module({
  imports: [SignupModule, LoginModule],
  providers: [AuthService],
  exports: [SignupModule],
})
export class AuthModule {}
