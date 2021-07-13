import { Body, Controller, Post } from '@nestjs/common';
import { JwtService, RedisService } from '@prohub/database-core';
import { LoginService } from '../login/login.service';
// import { AccountTypeCheck } from './decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { SignupService } from './signup.service';

@Controller('auth')
export class SignupController {
  constructor(
    private signupService: SignupService,
    private loginService: LoginService,
    private jwtService: JwtService,
    private redisService: RedisService
  ) {}
  @Post('signup')
  async createAccunt(@Body() userDto: UserDto) {
    const { email, accountType, password } = userDto;
    const res = await this.signupService.createAccount(userDto);

    try {
      const accountCreated = res;

      if ((accountCreated as { status: boolean }).status) {
        /** */
        // start creating account.

        const credentials = await this.loginService.login({
          email,
          accountType,
          password,
        });

        const token = await this.jwtService.generateToken(
          credentials as { email: string; _id: string; accountType: string }
        );

        /** create multiple device login token service */
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
            message: 'Account Created and logged in successfully.',
            data: token,
          },
        };
      } else {
        // eslint-disable-next-line no-prototype-builtins
        if (res.hasOwnProperty('response')) {
          throw res;
        } else {
          throw {
            response: res,
          };
        }
      }
    } catch (err) {
      return err;
    }
  }
}
