import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  ConsultantIndividualProfile,
  ConsultantIndividualProfileDocument,
  WorkExperience,
  WorkExperienceDocument,
} from '@prohub/database-schema';

import { Model, Types } from 'mongoose';

import { WorkExpDto } from '../dto/work-exp.dto';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectModel(ConsultantIndividualProfile.name)
    private consultantIndividualProfile: Model<ConsultantIndividualProfileDocument>,
    @InjectModel(WorkExperience.name)
    private workExpModel: Model<WorkExperienceDocument>
  ) {}

  async createWorkExp(workExp: WorkExpDto, profileId: string) {
    /*** */

    try {
      /** ref of profile schema */
      workExp.profileId = profileId;

      const saveWorkExp = new this.workExpModel(workExp);

      const { _id } = await saveWorkExp.save();

      return _id;
    } catch (err) {
      /** */
    }
  }

  async updateWorkExp(
    workExp: WorkExpDto,
    workExperienceId: string,
    profileId: string
  ) {
    try {
      workExp.profileId = profileId;

      await this.workExpModel
        .updateOne({ _id: workExperienceId }, workExp as any)
        .exec();

      return true;
    } catch (err) {
      return false;
      /** */
    }
  }
  /** master caller */
  async updateCreateWorkExp(workExp: WorkExpDto, userCred) {
    /** */
    try {
      /** create work exp */
      const { workExperienceId } = workExp;
      const { _id } = userCred;
      if (workExperienceId) {
        /**update  */

        const flagWorkExpUpdation = await this.updateWorkExp(
          workExp,
          workExperienceId,
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
        const workExpId = await this.createWorkExp(workExp, _id);

        /** update to profile Array with Id */

        await this.consultantIndividualProfile.updateOne(
          { consultantUserId: _id },
          { $push: { workExpList: workExpId } }
        );

        // return {
        //   message: 'created successfully.',
        //   workExperienceId: workExpId,
        // };
        return workExpId;
      }
    } catch (err) {
      return {
        message: 'Error in Updating Document.',
      };
      /** */
    }
  }

  async getWorkedExp(userCred) {
    try {
      const { _id } = userCred;
      console.log(_id);
      const workedExp = await this.consultantIndividualProfile
        .find(
          {
            consultantUserId: _id,
          },
          { workExpList: 1, _id: 0 }
        )
        .populate({
          path: 'workExpList',
          select: {
            workExperienceId: '$_id',
            title: 1,
            employementType: 1,
            companyName: 1,
            location: 1,
            workedDur: 1,
            description: 1,
            _id: 0,
          },
        });

      return workedExp[0]?.workExpList || [];
    } catch (err) {
      /** */
    }
  }

  async deleteWorkExp(userCred, query) {
    try {
      const { _id } = userCred;
      console.log(query);
      await this.consultantIndividualProfile.updateOne(
        {
          consultantUserId: _id,
        },
        { $pull: { workExpList: Types.ObjectId(query.workExperienceId) } }
      );
      return true;
    } catch (err) {
      /** */
      return false;
    }
  }
}
