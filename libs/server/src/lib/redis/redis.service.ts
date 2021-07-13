import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redis from 'redis';

@Injectable()
export class RedisService {
  private client;
  constructor(private configService: ConfigService) {
    this.client = redis.createClient({
      host: this.configService.get('REDIS_HOST'), // will write in env
      port: this.configService.get('REDIS_PORT'),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function

  async setData(keyName: string, value: string, expireTime: number) {
    return await this.client.set(keyName, value, 'EX', expireTime, redis.print);
  }

  async getData(keyName: string) {
    return new Promise((resolve, reject) => {
      this.client.get(keyName, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async setExpireTime(keyName: string, dur: number) {
    return await this.client.expire(keyName, dur);
  }

  async deleteData(keyName: string) {
    return this.client.del(keyName, redis.print);
  }
  /****
   * further will write stuff here
   */
}
