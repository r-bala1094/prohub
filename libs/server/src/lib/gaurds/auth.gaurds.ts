import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Request,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '../jwt/interfaces/jwt.interface';

import { JwtService } from '../jwt/jwt.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class JwtGaurdService extends JwtService implements CanActivate {
  constructor(
    public configService: ConfigService,
    @Inject('REDIS') private redisService: RedisService
  ) {
    super(configService);
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const bearerToken = request.headers['authorization'];

    if (!bearerToken) return false;

    try {
      /** */
      const token = (bearerToken || '').split(' ')[1];
      const { status, payload } = await this.verifyToken(token);

      if (!status) {
        return false;
      }

      /** find token from key from
       * write database code here for store multple login record
       */
      const savedToken = await this.findTokenAndVerifyToken(payload, token);

      if (savedToken !== token) {
        return false;
      } else {
        (request as JwtPayload).userCred = payload;
        return true;
      }
      /** */
    } catch (err) {
      return false;
    }
  }

  /** get particular token
   * return {{null}} if token not found and or expired
   */

  async findTokenAndVerifyToken(
    payload: JwtPayload | null | undefined,
    incommingToken: string
  ): Promise<string | null> {
    try {
      /***
       * find token from Redis Storage
       */
      const savedTokenArrayOfStringStringified = await this.redisService.getData(
        (payload as { _id: string })?._id
      );

      if (!savedTokenArrayOfStringStringified) {
        return null; // failed to login 403 error need to login
      }
      // as { token: string; loginFrom: string; deviceId: string | null };
      const parsedSavedTokenArray = JSON.parse(
        savedTokenArrayOfStringStringified as string
      );

      /** find token from Array token */

      const matchedToken = ((parsedSavedTokenArray as unknown) as Array<{
        [key: string]: string;
      }>).find(
        (tokenObj: { [key: string]: string }) =>
          tokenObj.token === incommingToken
      );

      /** check if token is found */

      if (!matchedToken) {
        return null;
      }

      /** verify matched token  */

      const { token } = matchedToken;

      await this.verifyToken(token);
      return token; // token verified successfully
    } catch (err) {
      return null;
    }
  }
}
