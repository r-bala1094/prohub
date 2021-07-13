import { BadRequestException, Injectable } from '@nestjs/common';
import { comparePassword, RedisService } from '@prohub/database-core';
import { LoginDto } from './dto/login.dto';
import { SignupService } from '../signup';

@Injectable()
export class LoginService extends SignupService {
  async login(loginDto: LoginDto) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { accountType, email, password } = loginDto;

      const { status, data } = await this.checkExists({
        accountType,
        email,
        matchedQuery: { email: 1, password: 1, accountType: 1, _id: 1 },
      });

      if (!status) {
        throw new BadRequestException({
          statusCode: 401,
          status: false,
          message: "User doesn't exists.",
          data: null,
        });
      } else {
        /** macth password here */
        const flag = await this.cmpPassword(password, data[0].password);

        if (flag) {
          const { email, accountType, _id } = (data || [])[0] || {};
          /****
           * object used for token generation
           */
          return { email, accountType, _id };
        } else {
          throw new BadRequestException({
            statusCode: 401,
            status: false,
            message: "Password did't matched.",
            data: null,
          });
        }
      }
    } catch (err) {
      throw err;
    }
  }

  /*****
   * write Bcrypt to match here
   */

  private async cmpPassword(password: string, hashedPassword) {
    try {
      return await comparePassword(password, hashedPassword);
    } catch (err) {
      throw new Error('Password not macthed');
    }
  }

  /**
   * storing Key Value Pair of Token in Redis
   */

  public async storeTokenInRedis(
    tokenObj: { token: string },
    userId: string,
    redisService: RedisService
  ) {
    /** */

    // const f = await redisService.setData(userId + "", [])
    try {
      const { token } = tokenObj;
      // const f = await redisService.setData(userId + '', JSON.stringify([token]));
      const userTokenList = await redisService.getData(userId + '');

      let tokenArray = [];

      /** contrcut tken Object*/

      const tokenCredentials = {
        token: token,
        loginFrom: 'WEB', // will change in future if mobile devices
        deviceId: null,
      };

      if (!userTokenList) {
        tokenArray.push(tokenCredentials);
      } else {
        tokenArray = JSON.parse(userTokenList as string) as Array<{
          token: string;
          loginFrom: string;
          deviceId: string | null;
        }>;

        tokenArray.push(tokenCredentials);
      }

      /** set to Redis Storage token Object Array */

      return await redisService.setData(
        userId + '',
        JSON.stringify(tokenArray),
        +this.configService.get('REDIS_USER_TOKEN_EXPIRE_TIME')
      );
    } catch (err) {
      return err;
    }
  }
}
