import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  WorkPreference,
  WorkPreferenceDocument,
} from '@prohub/database-schema';
import { Model } from 'mongoose';
import { CreateProjectService } from '../../service/create-project.service';
import { WorkPreferenceDto } from '../dto/work-preference.dto';

@Injectable()
export class WorkPreferenceService {
  constructor(
    @InjectModel(WorkPreference.name)
    private workPreferenceModel: Model<WorkPreferenceDocument>,
    private createProjectService: CreateProjectService
  ) {}

  async createUpdatePrivacy(workPreferenceDto: WorkPreferenceDto) {
    const { projectId, workPrefId } = workPreferenceDto;

    if (!workPrefId) {
      try {
        const createPrivacy = await this.directSave(workPreferenceDto);

        const { _id } = createPrivacy;

        /** create  */
        /**check exists in document of create project */
        const documentExists = await this.createProjectService.checkExistsDocument(
          projectId
        );

        if (documentExists) {
          //

          this.createProjectService.updateDocument(projectId, {
            $set: { workPreference: _id },
          });
        } else {
          //
          this.createProjectService.createProjectDocument(
            projectId,
            _id,
            'workPreference'
          );
        }

        // return createBasic;
        return {
          message: 'Work Pref. created Successfully.',
          status: true,
          type: 'created',
          statusCode: 200,
          data: _id,
        };
      } catch (err) {
        throw new Error('error in ops.');
      }

      /** update create project Schema for save information about details */
    } else {
      /** check exists from db if it exists then it has to be updated */
      await this.updateWorkPref(workPreferenceDto);
      return {
        message: 'Work Pref. saved Successfully.',
        status: true,
        type: 'saved',
        statusCode: 200,
        data: workPrefId,
      };

      //   const updateBasic = await this.updateBasicInfo(basicInfoDto);
      // return this.createProjectService.getAll();
    }
    /**/
  }

  async directSave(workPreferenceDto: WorkPreferenceDto) {
    /** */

    const basicModel = new this.workPreferenceModel(workPreferenceDto);
    return basicModel.save();
  }

  async updateWorkPref(workPreferenceDto: WorkPreferenceDto) {
    const { workPrefId } = workPreferenceDto;
    return this.workPreferenceModel
      .updateOne({ _id: workPrefId }, workPreferenceDto as WorkPreferenceDto)
      .exec();
    /**/
  }
}
