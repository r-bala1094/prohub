import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommunicationDocument, Communication } from '@prohub/database-schema';
import { Model } from 'mongoose';
import { CreateProjectService } from '../../service/create-project.service';
import { CommunicationMethodsDto } from '../dto/communication-methods.dto';

@Injectable()
export class CommnuicationMethodsService {
  constructor(
    @InjectModel(Communication.name)
    private communicationModel: Model<CommunicationDocument>,

    private createProjectService: CreateProjectService
  ) {}

  async createUpdateCommunication(communicationDto: CommunicationMethodsDto) {
    const { projectId, communicationMethodsId } = communicationDto;

    if (!communicationMethodsId) {
      try {
        const createCommunicationMethods = await this.directSave(
          communicationDto
        );

        const { _id } = createCommunicationMethods;

        /** create  */
        /**check exists in document of create project */
        const documentExists = await this.createProjectService.checkExistsDocument(
          projectId
        );

        if (documentExists) {
          //

          this.createProjectService.updateDocument(projectId, {
            $set: { communication: _id },
          });
        } else {
          //
          console.log('yes');
          this.createProjectService.createProjectDocument(
            projectId,
            _id,
            'communication'
          );
        }

        // return createBasic;
        return {
          message: 'Commnuication Methods created Successfully.',
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
      await this.updateCommunicationModelDto(communicationDto);
      return {
        message: 'Communication Methods saved Successfully.',
        status: true,
        type: 'saved',
        statusCode: 200,
        data: communicationMethodsId,
      };

      //   const updateBasic = await this.updateBasicInfo(basicInfoDto);
      // return this.createProjectService.getAll();
    }
    /**/
  }

  async directSave(communicationModelDto: CommunicationMethodsDto) {
    /** */

    const basicModel = new this.communicationModel(communicationModelDto);
    return basicModel.save();
  }

  async updateCommunicationModelDto(
    communicationModelDto: CommunicationMethodsDto
  ) {
    const { communicationMethodsId } = communicationModelDto;
    return this.communicationModel
      .updateOne({ _id: communicationMethodsId }, communicationModelDto as any)
      .exec();
    /**/
  }
}
