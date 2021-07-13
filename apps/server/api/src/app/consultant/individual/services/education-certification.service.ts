import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  ConsultantIndividualProfile,
  ConsultantIndividualProfileDocument,
  EducationCertification,
  EducationCertificationDocument,
} from '@prohub/database-schema';

import { Model } from 'mongoose';
import { EduCertDto } from '../dto/education-certification.dto';

@Injectable()
export class EducationCertificationService {
  constructor(
    @InjectModel(ConsultantIndividualProfile.name)
    private consultantIndividualProfile: Model<ConsultantIndividualProfileDocument>,
    @InjectModel(EducationCertification.name)
    private eduCertiModel: Model<EducationCertificationDocument>
  ) {}

  async createWorkExp(workExp: EduCertDto, profileId: string) {
    /*** */

    try {
      /** ref of profile schema */
      workExp.profileId = profileId;

      const saveEduCert = new this.eduCertiModel(workExp);

      const { _id } = await saveEduCert.save();

      return _id;
    } catch (err) {
      /** */
    }
  }

  async updateWorkExp(
    eduCert: EduCertDto,
    educationCertificationId: string,
    profileId: string
  ) {
    try {
      eduCert.profileId = profileId;

      await this.eduCertiModel
        .updateOne({ _id: educationCertificationId }, eduCert as any)
        .exec();

      return true;
    } catch (err) {
      return false;
      /** */
    }
  }
  /** master caller */
  async updateCreateEduCert(eduCert: EduCertDto, userCred) {
    /** */
    try {
      /** create work exp */
      const { educationCertificationId } = eduCert;
      const { _id } = userCred;
      if (educationCertificationId) {
        /**update  */

        const flagWorkExpUpdation = await this.updateWorkExp(
          eduCert,
          educationCertificationId,
          _id
        );

        if (flagWorkExpUpdation) {
          // return {
          //   message: 'Updated Successfully.',
          // };
          return true;
        } else {
          throw 'not update';
        }
      } else {
        /**create one */
        const eduCertId = await this.createWorkExp(eduCert, _id);

        /** update to profile Array with Id */

        await this.consultantIndividualProfile.updateOne(
          { consultantUserId: _id },
          { $push: { EducationCertificationList: eduCertId } }
        );

        // return {
        //   message: 'created successfully.',
        //   educationCertificationId: eduCertId,
        // };
        return eduCertId;
      }
    } catch (err) {
      // return {
      //   message: 'Error in Updating Document.',
      // };
      return null;
      /** */
    }
  }

  async getEduCert(userCred) {
    try {
      const { _id } = userCred;

      const eduCert = await this.consultantIndividualProfile
        .find(
          {
            consultantUserId: _id,
          },
          { EducationCertificationList: 1, _id: 0 }
        )
        .populate({
          path: 'EducationCertificationList',
          select: {
            educationCertificationId: '$_id',
            courseCertificateTitle: 1,
            schoolOrUniversity: 1,
            workedDur: 1,
            descriptionOrFaculty: 1,
            _id: 0,
          },
        });
      return eduCert[0]?.EducationCertificationList;
    } catch (err) {
      /** */
    }
  }

  async deleteEduCert(userCred, query) {
    try {
      const { _id } = userCred;

      await this.consultantIndividualProfile.updateOne(
        {
          consultantUserId: _id,
        },
        { $pull: { EducationCertificationList: query.id } }
      );
      return {
        message: 'Deleted Successfully',
        status: true,
        statusCode: 200,
        data: true,
      };
    } catch (err) {
      /** */
      return {
        message: 'Error in Deletion',
        status: false,
        statusCode: 401,
      };
    }
  }
}
