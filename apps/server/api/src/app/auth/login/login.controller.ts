import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { JwtService, RedisService } from '@prohub/database-core';

@Controller('auth')
export class LoginController {
  constructor(
    private loginService: LoginService,
    private jwtService: JwtService,
    private redisService: RedisService
  ) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // console.log(this.configService.get<string>('JWT_SECRET'));
    try {
      const credentials = await this.loginService.login(loginDto);

      /** create token from credentials */

      const token = await this.jwtService.generateToken(
        credentials as { email: string; _id: string; accountType: string }
      );

      await this.loginService.storeTokenInRedis(
        token as { token: string },
        credentials._id,
        this.redisService
      );
      // await this.redisService.setData(
      //   ((credentials as { _id })._id as string) + '',
      //   ((token as { token: string }).token as unknown) as string
      // );
      return {
        response: {
          statusCode: 200,
          status: true,
          message: 'login successful.',
          data: token,
        },
      };
    } catch (err) {
      return err;
    }
  }
}
