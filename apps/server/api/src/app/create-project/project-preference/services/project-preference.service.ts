import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProjectPreference,
  ProjectPreferenceDocument,
} from '@prohub/database-schema';
import { Model } from 'mongoose';
import { CreateProjectService } from '../../service/create-project.service';
import { ProjectPreferenceDto } from '../dto/project-preference.dto';

@Injectable()
export class ProjectPreferenceService {
  constructor(
    @InjectModel(ProjectPreference.name)
    private projectPreferenceModel: Model<ProjectPreferenceDocument>,

    private createProjectService: CreateProjectService
  ) {}

  async createUpdateProjectPreference(
    projectPreferenceDto: ProjectPreferenceDto
  ) {
    const { projectId, projectPreferenceId } = projectPreferenceDto;

    if (!projectPreferenceId) {
      try {
        const createProjectPref = await this.directSave(projectPreferenceDto);

        const { _id } = createProjectPref;

        /** create  */
        /**check exists in document of create project */
        const documentExists = await this.createProjectService.checkExistsDocument(
          projectId
        );

        if (documentExists) {
          //
          this.createProjectService.updateDocument(projectId, {
            $set: { projectPreference: _id },
          });
        } else {
          //
          this.createProjectService.createProjectDocument(
            projectId,
            _id,
            'projectPreference'
          );
        }

        // return createBasic;
        return {
          message: 'Project Preference created Successfully.',
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
      await this.updateProjectPref(projectPreferenceDto);
      return {
        message: 'Project Preference saved Successfully.',
        status: true,
        type: 'saved',
        statusCode: 200,
        data: projectPreferenceId,
      };

      //   const updateBasic = await this.updateBasicInfo(basicInfoDto);
      // return this.createProjectService.getAll();
    }
    /**/
  }

  async directSave(projectPreferenceDto: ProjectPreferenceDto) {
    /** */

    const basicModel = new this.projectPreferenceModel(projectPreferenceDto);
    return basicModel.save();
  }

  async updateProjectPref(projectPreferenceDto: ProjectPreferenceDto) {
    const { projectPreferenceId } = projectPreferenceDto;
    return await this.projectPreferenceModel
      .updateOne({ _id: projectPreferenceId }, projectPreferenceDto as any)
      .exec();
    /**/
  }
}
