import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConsultantIndividualProfile,
  ConsultantIndividualProfileDocument,
} from '@prohub/database-schema';
import { Model } from 'mongoose';

@Injectable()
export class ConsultantIndividualProfileService {
  constructor(
    @InjectModel(ConsultantIndividualProfile.name)
    private consultantIndividualProfile: Model<ConsultantIndividualProfileDocument>
  ) {}

  async updateParentDocument(lastInsertedId: any, id: string) {
    try {
      await this.consultantIndividualProfile.updateOne(
        { consultantUserId: id },
        {
          $set: {
            categoryAndSkillsId: lastInsertedId,
          },
        }
      );

      return true;
    } catch (err) {
      throw null;
    }
  }
}
