import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsS3Service } from '@prohub/database-core';
import { CreateProjectService } from '../../service/create-project.service';

@Injectable()
export class ImageUploadService extends AwsS3Service {
  // constructor(
  //   public configService: ConfigService,
  //   private createProjectService: CreateProjectService
  // ) {
  //   super(configService);
  // }
  async uploadFile(filesBuffer: Array<{ [key: string]: string | Buffer }>) {
    try {
      const uploadedFileArray = filesBuffer.map(async (buffer) => {
        return await this.uploadToS3(
          buffer as { buffer: Buffer },
          (buffer as { originalname: string }).originalname
        );
      });

      return uploadedFileArray;
    } catch (err) {
      throw {
        message: 'Error uploading files.',
        statusCode: 400,
        status: false,
        data: null,
      };
    }
  }
}
