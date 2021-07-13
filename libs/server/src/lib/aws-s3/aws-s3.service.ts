import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AwsS3Service {
  constructor(public configService: ConfigService) {}
  /**
   *
   * @param buffer uploaded buffer of from client
   * @param filename origial filename
   * @returns AWS uploaded Results
   */
  async uploadToS3(buffer: { buffer: Buffer }, filename: string) {
    const s3 = new S3();
    const keyName = `${uuid()}-${filename}`;

    try {
      const uploadedFile = new Promise((resolve, reject) => {
        s3.upload(
          {
            Bucket: this.configService.get<string>(
              'AWS_PUBLIC_BUCKET_NAME'
            ) as string,
            Body: buffer.buffer,
            Key: keyName,
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }

            resolve(data);
          }
        );
      });
      return await uploadedFile;
    } catch (err) {
      return new BadRequestException('unable to upload File.');
    }
  }
}
