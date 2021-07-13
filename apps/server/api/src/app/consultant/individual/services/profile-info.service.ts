import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AwsS3Service } from '@prohub/database-core';
import {
  ConsultantIndividualProfile,
  ConsultantIndividualProfileDocument,
} from '@prohub/database-schema';

import { Model } from 'mongoose';
import { ProfileInfoDto } from '../dto/profile-info.dto';
@Injectable()
export class ProfileInfoService {
  constructor(
    @InjectModel(ConsultantIndividualProfile.name)
    private consultantIndividualProfile: Model<ConsultantIndividualProfileDocument>,
    private awsS3Service: AwsS3Service
  ) {}

  /** upload to S3 */
  async uploadCvOrResumeToS3(file: { [key: string]: string | Buffer }) {
    return await this.awsS3Service.uploadToS3(
      file as { buffer: Buffer },
      (file as { originalname: string }).originalname
    );
  }

  /** master caller */
  async updateToProfile(cvObj: {
    file: { [key: string]: string | Buffer };
    profileInfo: ProfileInfoDto;
    userCred;
  }) {
    try {
      const { file, profileInfo, userCred } = cvObj;
      /** CV/Resume upload To S3 */
      /** check here mime type of file allowed are PDF and DOCS */
      // console.log(files);
      let resOfUploadedCvOrResume = null;
      if (file) {
        resOfUploadedCvOrResume = await this.uploadCvOrResumeToS3(file);
      }

      // return resOfUploadedCvOrResume;
      /** now modify Data */

      // console.log(userCred);
      return this.updateOrCreateProfile(
        resOfUploadedCvOrResume,
        profileInfo,
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

      // const count = await this.consultantIndividualProfile
      //   .find({ consultantUserId: _id })
      //   .exec();

      // if (!count.length) {
      //   const createOne = new this.consultantIndividualProfile({
      //     consultantUserId: _id,
      //     profileInfo: mongoQuery,
      //   });
      //   const saved = await createOne.save();
      //   return {
      //     message: 'created successfully',
      //     consulatntUserId: saved._id,
      //   };
      // } else {
      const combine = {};

      Object.keys(mongoQuery).forEach((accu) => {
        combine[`profileInfo.${accu}`] = mongoQuery[accu];
      });

      await this.consultantIndividualProfile
        .updateOne({ consultantUserId: _id }, { $set: combine })
        .exec();
      return {
        message: 'saved successfully',
        status: true,
        statusCode: 200,
        data: null,
        // g,
        // };
      };
    } catch (err) {
      throw new BadRequestException('unable to do ops.');
    }
    // return count;
  }

  async createMongoQueryForUploadCv(uploadedFiles, profileInfo, userCred) {
    const mongoQuery: any = {};
    if (uploadedFiles) {
      const _fileObj = uploadedFiles || {};

      const { Key, Location } = _fileObj;

      mongoQuery.profilePic = {
        fileId: Date.now() + '',
        filename: Key,
        fileUrl: Location,
        uploadedAt: new Date().toISOString(),
      };
    }

    /** this is saved as per data saved */

    mongoQuery.name = profileInfo;

    const { _id } = userCred;
    return { _id: _id, mongoQuery };
  }

  /** get profile info */

  async getProfileInfo(userCred) {
    const { _id } = userCred;

    try {
      const profileInfo = await this.consultantIndividualProfile.find(
        {
          consultantUserId: _id,
        },
        { profileInfo: 1, _id: 0 }
      );
      return {
        status: true,
        statusCode: 200,
        message: 'Fetched successfully',
        data: profileInfo[0],
      };
    } catch (err) {
      /** */
    }
  }
}
