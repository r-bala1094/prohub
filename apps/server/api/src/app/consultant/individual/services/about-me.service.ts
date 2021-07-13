import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  ConsultantIndividualProfile,
  ConsultantIndividualProfileDocument,
} from '@prohub/database-schema';

import { Model } from 'mongoose';
import { AboutMeDto } from '../dto/about-me.sto';

@Injectable()
export class AboutMeService {
  constructor(
    @InjectModel(ConsultantIndividualProfile.name)
    private consultantIndividualProfile: Model<ConsultantIndividualProfileDocument>
  ) {}

  async updateToAboutMe(aboutMeObj: { aboutMe: AboutMeDto; userCred }) {
    try {
      const { aboutMe, userCred } = aboutMeObj;

      const { _id } = userCred;

      await this.consultantIndividualProfile
        .updateOne(
          { consultantUserId: _id },
          { $set: { aboutMe: aboutMe.aboutMe } }
        )
        .exec();

      return {
        message: 'Updated successfully',
      };
    } catch (err) {
      return {
        message: 'error in update',
      };
    }
    /** */
  }

  async getAboutMe(userCred) {
    const { _id } = userCred;

    try {
      const aboutMe = await this.consultantIndividualProfile.find(
        {
          consultantUserId: _id,
        },
        { aboutMe: 1, _id: 0 }
      );
      return {
        status: true,
        statusCode: 200,
        message: 'Fetched successfully',
        data: aboutMe[0],
      };
    } catch (err) {
      /** */
    }
  }
}
