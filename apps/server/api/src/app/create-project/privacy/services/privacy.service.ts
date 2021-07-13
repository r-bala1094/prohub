import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PrivacyProject,
  PrivacyProjectDocument,
} from '@prohub/database-schema';
import { Model } from 'mongoose';
import { CreateProjectService } from '../../service/create-project.service';
import { PrivacyDto } from '../dto/privacy.dto';

@Injectable()
export class PrivacyService {
  constructor(
    @InjectModel(PrivacyProject.name)
    private privacyModel: Model<PrivacyProjectDocument>,
    private createProjectService: CreateProjectService
  ) {}

  async createUpdatePrivacy(privacyDto: PrivacyDto) {
    const { projectId, privacyId } = privacyDto;

    if (!privacyId) {
      try {
        const createPrivacy = await this.directSave(privacyDto);

        const { _id } = createPrivacy;

        /** create  */
        /**check exists in document of create project */
        const documentExists = await this.createProjectService.checkExistsDocument(
          projectId
        );

        if (documentExists) {
          //

          this.createProjectService.updateDocument(projectId, {
            $set: { privacyProject: _id },
          });
        } else {
          //
          this.createProjectService.createProjectDocument(
            projectId,
            _id,
            'privacyProject'
          );
        }

        // return createBasic;
        return {
          message: 'Privacy created Successfully.',
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
      await this.updateBasicInfo(privacyDto);
      return {
        message: 'Privacy saved Successfully.',
        status: true,
        type: 'saved',
        statusCode: 200,
        data: privacyId,
      };

      //   const updateBasic = await this.updateBasicInfo(basicInfoDto);
      // return this.createProjectService.getAll();
    }
    /**/
  }

  async directSave(privacyDto: PrivacyDto) {
    /** */

    const basicModel = new this.privacyModel(privacyDto);
    return basicModel.save();
  }

  async updateBasicInfo(privacyDto: PrivacyDto) {
    const { privacyId } = privacyDto;
    return this.privacyModel
      .updateOne({ _id: privacyId }, privacyDto as any)
      .exec();
    /**/
  }
}
