import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Budget,
  BudgetDocument,
  Milestone,
  MilestoneDocument,
} from '@prohub/database-schema';
import { Model } from 'mongoose';
import { MilestoneDto } from '../dto/milestone.dto';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(Milestone.name)
    private milestoneModel: Model<MilestoneDocument>,

    @InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>
  ) {}

  async createUpdateMilestone(milestoneDto: MilestoneDto) {
    /** */
    const { projectId, milestoneId } = milestoneDto;

    // if (!projectId) {
    //   return {
    //     message: 'Project Id not be null.',
    //     status: false,
    //     statusCode: 400,
    //     data: null,
    //   };
    // }

    /** now check the milestone id is null then create milestone */
    if (!milestoneId) {
      return this.createMilestone(milestoneDto);
    } else {
      return this.updateMilestone(milestoneDto);
    }
  }

  private async createMilestone(milestoneDto: MilestoneDto) {
    /** */
    const { projectId } = milestoneDto;
    const milestoneData = new this.milestoneModel(milestoneDto);

    const { _id } = milestoneData;

    milestoneData.save();

    /** update Budget Model for Entry of Milestone lists ref */

    this.budgetModel
      .updateOne({ _id: projectId }, { $push: { milestone: _id } })
      .exec();

    return {
      message: 'Milestone create Successfully/',
      status: true,
      statusCode: 200,
      data: _id,
    };
  }

  private async updateMilestone(milestoneDto: MilestoneDto) {
    const { milestoneId } = milestoneDto;

    this.milestoneModel
      .updateOne(
        { _id: milestoneId },
        (milestoneDto as unknown) as MilestoneDocument
      )
      .exec();
    return {
      message: 'Milestone update Successfully',
      status: true,
      statusCode: 200,
      data: milestoneId,
    };
    /** */
  }

  async getMilestone(projectId: string) {
    const mile = this.milestoneModel
      .find(
        { projectId: projectId },
        {
          milestoneId: '$_id',
          currencyType: 1,
          platformToMembers: 1,
          description: 1,
          budgetId: 1,
          amount: 1,
          _id: 0,
        }
      )
      .exec();
    // cosnole.log(mile);
    return await mile;
  }

  /************
   * Delete MileStone
   */

  async deleteMilestone(milestone: { milestoneId: string; projectId: string }) {
    try {
      const { projectId, milestoneId } = milestone;
      this.milestoneModel
        .findOneAndDelete({ $and: [{ projectId }, { _id: milestoneId }] })
        .exec();
      // cosnole.log(mile);

      return milestoneId;
    } catch (err) {
      throw '';
    }
  }
}
