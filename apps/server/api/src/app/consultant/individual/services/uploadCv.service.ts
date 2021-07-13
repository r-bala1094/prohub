import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AwsS3Service } from '@prohub/database-core';
import {
  ConsultantIndividualProfile,
  ConsultantIndividualProfileDocument,
} from '@prohub/database-schema';

import { Model } from 'mongoose';
import { UploadCvDto } from '../dto/uploadCv.dto';

@Injectable()
export class UploadCvService {
  constructor(
    @InjectModel(ConsultantIndividualProfile.name)
    private consultantIndividualProfile: Model<ConsultantIndividualProfileDocument>,
    private awsS3Service: AwsS3Service
  ) {}

  /** upload to S3 */
  async uploadCvOrResumeToS3(files: Array<{ [key: string]: string | Buffer }>) {
    const fileArray = files.map(
      async (accu: { buffer: Buffer; originalname: string }) => {
        return await this.awsS3Service.uploadToS3(accu, accu.originalname);
      }
    );

    return await Promise.all(fileArray);
  }

  /** master caller */
  async updateToProfile(cvObj: {
    files: Array<{ [key: string]: string | Buffer }>;
    cvImportType: UploadCvDto;
    userCred;
  }) {
    try {
      const { files, cvImportType, userCred } = cvObj;
      /** CV/Resume upload To S3 */
      /** check here mime type of file allowed are PDF and DOCS */
      // console.log(files);
      let resOfUploadedCvOrResume = null;
      if (files.length) {
        resOfUploadedCvOrResume = await this.uploadCvOrResumeToS3(files);
      }

      // return resOfUploadedCvOrResume;
      /** now modify Data */

      // console.log(userCred);
      return this.updateOrCreateProfile(
        resOfUploadedCvOrResume,
        cvImportType,
        userCred
      );
      // return resOfUploadedCvOrResume;
    } catch (err) {
      return new BadRequestException('error in uploading CV or Resume');
      /** */
    }
    // console.log(cvObj);
  }

  async updateOrCreateProfile(uploadedFiles, cvImportType, userCred) {
    /** find if exists then update or not create one */

    try {
      const { mongoQuery } = await this.createMongoQueryForUploadCv(
        uploadedFiles,
        cvImportType,
        userCred
      );
      const { _id } = userCred;

      const count = await this.consultantIndividualProfile
        .find({ consultantUserId: _id })
        .exec();

      if (!count.length) {
        const createOne = new this.consultantIndividualProfile({
          consultantUserId: _id,
          uploadCv: mongoQuery,
        });
        const saved = await createOne.save();
        return {
          message: 'created successfully',
          status: true,
          statusCode: 200,
          data: saved._id,
        };
      } else {
        const combine = {};

        Object.keys(mongoQuery).forEach((accu) => {
          combine[`uploadCv.${accu}`] = mongoQuery[accu];
        });

        await this.consultantIndividualProfile
          .updateOne({ consultantUserId: _id }, { $set: combine })
          .exec();
        return {
          message: 'updated successfully',
          status: true,
          statusCode: 200,
          data: null,
        };
      }
    } catch (err) {
      throw new BadRequestException('unable to do ops.');
    }
    // return count;
  }

  async createMongoQueryForUploadCv(uploadedFiles, cvImportType, userCred) {
    const mongoQuery: any = {};
    if (uploadedFiles) {
      const _fileObj = (uploadedFiles || [])[0] || {};

      const { Key, Location } = _fileObj;

      mongoQuery.resumeOrCv = {
        fileId: Date.now() + '',
        filename: Key,
        fileUrl: Location,
        uploadedAt: new Date().toISOString(),
      };
    }

    /** this is saved as per data saved */
    const _ = cvImportType;

    const { _id } = userCred;

    mongoQuery.importType = {
      aboutMe: _.aboutMe === 'true' ? true : false,
      experiences: _.experiences === 'true' ? true : false,
      educations: _.educations === 'true' ? true : false,
      skills: _.skills === 'true' ? true : false,
    };

    return { _id: _id, mongoQuery };
  }

  /********************** get uploded CV */

  async getUploadedCv(userCred) {
    const { _id } = userCred;

    try {
      const uploadedCv = await this.consultantIndividualProfile.find(
        {
          consultantUserId: _id,
        },
        { uploadCv: 1, _id: 0 }
      );
      return {
        status: true,
        statusCode: 200,
        message: 'Fetched successfully',
        data: uploadedCv[0],
      };
    } catch (err) {
      /** */
    }
  }
}
