import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { allowedMimeTypeForProjectAndSerivices } from '@prohub/constants';
import { AwsS3Service } from '@prohub/database-core';
import {
  ConsultantIndividualProfile,
  ConsultantIndividualProfileDocument,
  ProjectAndService,
  ProjectAndServiceDocument,
} from '@prohub/database-schema';
import { UserCredentials } from '@prohub/interfaces';
import { MimeInput, MimeOutput, MimeTypeCheckOfUploadFile } from '@prohub/util';

import { Model } from 'mongoose';
import { ProjectAndServiceDto } from '../dto/project-service.dto';

@Injectable()
export class ProjectAndServiceService {
  constructor(
    @InjectModel(ConsultantIndividualProfile.name)
    private consultantIndividualProfile: Model<ConsultantIndividualProfileDocument>,
    @InjectModel(ProjectAndService.name)
    private projectAndServiceModel: Model<ProjectAndServiceDocument>,
    private awsS3Service: AwsS3Service
  ) {}
  /** limit checking of uploded image , mime type */
  // @MimeTypeCheckUploadFile(
  //   ['test', 'file'],
  //   /**index of argument of file buffer */ 1
  // )
  @MimeTypeCheckOfUploadFile(allowedMimeTypeForProjectAndSerivices, Infinity)
  async uploadFiles(
    userCredentials: UserCredentials,
    @MimeInput fileObject: { [key: string]: string | Buffer },
    @MimeOutput
    mimeOutput?: {
      fileExists: boolean;
      isSize: boolean;
      isMimeType: boolean;
    }
  ) {
    /** */
    try {
      const { fileExists, isMimeType, isSize } = mimeOutput;

      if (!fileExists) {
        throw 'File type Must be Binary File.';
      }
      if (!isSize || !isMimeType) {
        throw "File does't meet requirements.";
      }

      /** upload file to AWS s3. */
      const uploadedCredentials = await this.uploadProjectAndServiceToS3(
        fileObject
      );
      return {
        flag: true,
        data: uploadedCredentials,
      };
    } catch (err) {
      return {
        flag: false,
        data: null,
      };
    }
  }

  async uploadProjectAndServiceToS3(fileObject: {
    [key: string]: string | Buffer;
  }) {
    try {
      const { buffer, originalname } = fileObject;
      const filesMetaData = await this.awsS3Service.uploadToS3(
        { buffer: buffer as Buffer },
        originalname as string
      );
      if (!Object.keys(filesMetaData).length) {
        throw null;
      }
      /** attach original file namw with credentials */
      filesMetaData['originalName'] = originalname;

      return filesMetaData;
    } catch (err) {
      throw null;
    }
  }

  /** for updating project and service data */
  async createOrUpdateProjectAndServie(
    projectAndServiceDto: ProjectAndServiceDto,
    userCredentials: UserCredentials
  ) {
    try {
      /** check projecAndServiceId is null then create new */
      const { projectAndServiceId } = projectAndServiceDto;
      const { _id } = userCredentials; // userId

      projectAndServiceDto.profileId = _id;

      if (!projectAndServiceId) {
        /** create one */

        const lastInsertedId = await this.createProjectAndService(
          _id,
          projectAndServiceDto
        );
        /** update parent Array of indexes */

        await this.updateProjectServiceIdInParentSchema(lastInsertedId, _id);

        return lastInsertedId;
      } else {
        /** update one */

        await this.updateProjectAndService(
          projectAndServiceDto,
          projectAndServiceId
        );

        return projectAndServiceId;
      }
    } catch (err) {
      throw null;
    }
  }

  /** for creating into schema */

  async createProjectAndService(
    _id: any,
    projectAndServiceDto: ProjectAndServiceDto
  ) {
    try {
      /** create schema of parent */
      const projectAndServiceModel = new this.projectAndServiceModel(
        projectAndServiceDto
      );
      const { _id } = await projectAndServiceModel.save();
      return _id;
    } catch (err) {
      return null;
    }
  }

  /** update parent schema to array */

  async updateProjectServiceIdInParentSchema(id: string, parentId: string) {
    try {
      await this.consultantIndividualProfile.updateOne(
        { consultantUserId: parentId },
        { $push: { projectAndServicesList: id } }
      );
      return true;
    } catch (err) {
      throw null;
    }
  }

  async updateProjectAndService(
    projectAndServiceDto: ProjectAndServiceDto,
    projectAndServiceId: string
  ) {
    try {
      await this.projectAndServiceModel.updateOne(
        { _id: projectAndServiceId },
        projectAndServiceDto as any
      );

      return true;
    } catch (err) {
      throw null;
    }
  }

  /**
   * to get list of Project and Services
   */
  async getProjectAndServiceList(userCredentials: UserCredentials) {
    try {
      const { _id } = userCredentials;
      const projectAndServiceList =
        (await this.consultantIndividualProfile
          .find(
            {
              consultantUserId: _id,
            },
            { projectAndServicesList: 1, _id: 0 }
          )
          .populate({
            path: 'projectAndServicesList',
            select: {
              projectAndServiceId: '$_id',
              projectAndServiceTitle: 1,
              projectDuration: 1,
              categories: 1,
              _id: 0,
            },
          })) || [];

      return projectAndServiceList[0]?.projectAndServicesList;
    } catch (err) {
      throw null;
    }
  }

  /**
   * to Get Particular Data of Project and Services.
   */
  async getProjectAndService(
    userCredentials: UserCredentials,
    where: { projectAndServiceId: string }
  ) {
    try {
      const { _id } = userCredentials;
      const { projectAndServiceId } = where;

      const projectAndService =
        (await this.projectAndServiceModel.find(
          {
            $and: [{ _id: projectAndServiceId }, { profileId: _id }],
          },
          {
            projectAndServiceId: '$_id',
            subCategories: 1,
            categories: 1,
            projectAndServiceTitle: 1,
            projectDuration: 1,
            uploadedFiles: 1,
            _id: 0,
          }
        )) || [];
      return projectAndService[0] || {};
    } catch (err) {
      throw null;
    }
  }
}
