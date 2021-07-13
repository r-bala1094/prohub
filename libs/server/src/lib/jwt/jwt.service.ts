import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import {
  JwtPayload,
  JwtTokenRes,
  VerifiedToken,
} from './interfaces/jwt.interface';
@Injectable()
export class JwtService {
  constructor(public configService: ConfigService) {}
  /**
   *
   * @param tokenPayload token payload for generation of token
   * @returns payload returns
   */
  async generateToken(tokenPayload: JwtPayload): Promise<JwtTokenRes | Error> {
    try {
      const token = jwt.sign(
        tokenPayload,
        this.configService.get<string>('JWT_SECRET') as string
      );
      return {
        token: token,
        tokenExpireDur: this.configService.get<string>(
          'JWT_EXPIRE_TIME'
        ) as string,
        tokenExpiresAt:
          Date.now() +
          +(this.configService.get<string>('JWT_EXPIRE_TIME') as string),
      };
    } catch (err) {
      return new BadGatewayException({
        statusCode: 401,
        status: false,
        message: 'Error in Login.',
        data: null,
      });
    }
  }

  async verifyToken(token: string): Promise<VerifiedToken> {
    try {
      const verifiedToken = await jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET') as string
      );
      return {
        status: true,
        payload: verifiedToken as JwtPayload,
      };
    } catch (err) {
      return {
        status: false,
        payload: null,
      };
    }
  }
}
