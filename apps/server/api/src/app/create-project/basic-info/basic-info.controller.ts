import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from './services/image-upload.service';
import { BasicInfoSaveService } from './services/save-file.service';
import { JwtGaurdService } from '@prohub/database-core';
import { BasicInfoDto } from './dto/basic-info.dto';
import { BasicInfoService } from './services/basic-info.service';
@Controller('create-project')
export class BasicInfoController {
  constructor(
    private imageUploadService: ImageUploadService,
    private saveFileService: BasicInfoSaveService,
    private basicInfoService: BasicInfoService
  ) {}

  @UseGuards(JwtGaurdService)
  @Post('basic-info/upload-file')
  @UseInterceptors(FilesInterceptor('file'))
  async createCollection(
    @UploadedFiles() files: Array<{ [key: string]: string | Buffer }>
  ) {
    /**
     * files will appear here.
     */
    /** set with SSE for event based upload tracking */

    try {
      const uploadToS3Bucket = await this.imageUploadService.uploadFile(
        files as Array<{ [key: string]: string | Buffer }>
      );
      const saveFile = await this.saveFileService.saveFile(
        uploadToS3Bucket as Array<Promise<{ [key: string]: string }>>
      );
      return {
        response: {
          status: true,
          message: 'files uploaded successfully.',
          statusCode: 200,
          data: saveFile,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        response: {
          data: null,
          status: false,
          statusCode: 400,
          message: 'Unable to Upload files.',
        },
      });
    }
  }
  /**
   * for create basic info data
   * @returns
   */
  @UseGuards(JwtGaurdService)
  @Post('basic-info')
  async basicInformation(@Body() basicInfoDto: BasicInfoDto, @Req() req) {
    /** */
    const basicInfoData = await this.basicInfoService.createOrUpdateBasicInfo(
      basicInfoDto,
      req.userCred
    );
    return {
      response: basicInfoData,
    };
  }

  @UseGuards(JwtGaurdService)
  @Delete('baisc-info-upload-file')
  async deleteFile() {
    return {
      response: {
        message: 'File Deleted Successfully.',
        status: true,
        statusCode: 200,
        data: true,
      },
    };
  }
  // @Post('testSchema')
  // async checkWhatIs() {
  //   // 60a8a04820e86a229c1213b1
  //   // const f = new this.BasicInfoModel({ name: '200' });
  //   const f = new this.CreateProjectModel({
  //     _id: '60a8a04820e86a229c1213b1',
  //     basicInfo: '60a8999362458f40a0b89279',
  //   });
  //   // return this.CreateProjectModel.find({}).populate('basicInfo').exec();
  //   return f.save();
  // }
}
