import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BasicInfo, BasicInfoDocument } from '@prohub/database-schema';
import { Model } from 'mongoose';
import { CreateProjectService } from '../../service/create-project.service';
import { BasicInfoDto } from '../dto/basic-info.dto';

@Injectable()
export class BasicInfoService {
  constructor(
    @InjectModel(BasicInfo.name)
    private BasicInfoModel: Model<BasicInfoDocument>,

    private createProjectService: CreateProjectService
  ) {}

  async createOrUpdateBasicInfo(basicInfoDto: BasicInfoDto, userCred) {
    /**
     * check if id is null then it has to be created
     */
    const { projectId, basicInfoId } = basicInfoDto;

    /** for exracting feilds of ids f basic infos */
    if (Array.isArray(basicInfoDto.files)) {
      basicInfoDto.files = basicInfoDto.files.map((accu) => {
        return ((accu as unknown) as { basicInfoUploadedFileId })
          .basicInfoUploadedFileId;
      });
    }

    if (!basicInfoId) {
      const createBasic = await this.directSave(basicInfoDto);

      const { _id } = createBasic;

      const documentExists = await this.createProjectService.checkExistsDocument(
        projectId
      );

      if (documentExists) {
        //
        this.createProjectService.updateDocument(projectId, {
          $set: { basicInfo: _id },
        });
      } else {
        //
        this.createProjectService.createProjectDocument(
          projectId,
          _id,
          'basicInfo',
          userCred._id
        );
      }

      return {
        message: 'Basic Information saved Successfully.',
        status: true,
        type: 'created',
        statusCode: 200,
        data: _id,
      };
      /** update create project Schema for save information about details */
    } else {
      /** check exists from db if it exists then it has to be updated */
      await this.updateBasicInfo(basicInfoDto);
      return {
        message: 'Basic Information saved Successfully.',
        status: true,
        type: 'updated',
        statusCode: 200,
        data: basicInfoId,
      };

      // return this.createProjectService.getAll();
    }
  }
  async directSave(basicInfoDto: BasicInfoDto) {
    /** */

    const basicModel = new this.BasicInfoModel(basicInfoDto);
    return basicModel.save();
  }

  async updateBasicInfo(basicInfoDto: BasicInfoDto) {
    const { basicInfoId } = basicInfoDto;
    return await this.BasicInfoModel.updateOne(
      { _id: basicInfoId },
      basicInfoDto as any
    ).exec();
    /**/
  }
}
