import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProject, CreateProjectDocument } from '@prohub/database-schema';
import { Model, Schema as MongooseSchema, Types } from 'mongoose';

@Injectable()
export class CreateProjectService {
  constructor(
    @InjectModel(CreateProject.name)
    private createProjectModel: Model<CreateProjectDocument>
  ) {}

  async checkExistsDocument(id: string): Promise<boolean | Error> {
    try {
      const document = await this.createProjectModel.find({ _id: id }).exec();

      if (!document.length) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw new Error('error in getting document.');
    }
  }

  async updateDocument(id: string, refObj: any) {
    return this.createProjectModel.updateOne(
      { _id: id },
      { ...refObj, modifiedAt: new Date().toISOString() }
    );
  }

  async createProjectDocument(
    id: string,
    refId: string,
    type: string,
    userId?
  ) {
    const _projectModel = new this.createProjectModel({
      _id: id,
      [type]: refId,
      createdAt: new Date().toISOString(),
      userId: userId,
    });
    return _projectModel.save();
  }

  async getCreatedProjectParts(id, projectionObj, populateObj) {
    try {
      const fecthedResult = this.createProjectModel

        .find({ _id: Types.ObjectId(id) })
        .populate(populateObj)

        .exec();

      return await fecthedResult;
    } catch (err) {
      return [];
    }
  }

  async getCreatedProject(id, projection: string) {
    try {
      const fecthedResult = this.createProjectModel

        .find({ _id: id })
        // .populate(projection, {
        //   __v: 0,
        // })
        .populate({
          path: 'basicInfo',
          populate: {
            path: 'files',
            model: 'BasicInfoUploadFile',
          },
        })
        .populate(projection, { __v: 0 })
        .exec();

      return await fecthedResult;
    } catch (err) {
      return [];
    }
  }

  async submitProject(query: {
    projectId: string;
    projectSubmitted: boolean;
    status: { public: boolean; private: boolean; invited: boolean };
  }) {
    const { projectId, status, projectSubmitted } = query;

    try {
      await this.createProjectModel.updateOne(
        { _id: projectId },
        {
          submmited: projectSubmitted,
          submittedDate: new Date().toISOString(),
          status,
        }
      );

      return true;
    } catch (err) {
      return false;
    }
  }

  async getCreatedProjectLists(userCred) {
    try {
      const { _id } = userCred;
      return await this.createProjectModel
        .find(
          {
            $and: [{ userId: _id }],
          },
          {
            projectId: '$_id',
            status: 1,
            submmited: 1,
            submittedDate: 1,
            _id: 0,
          }
        )
        .populate({
          path: 'basicInfo',
          as: 'info',
          select: {
            projectTitle: 1,
            startDate: 1,
            proposedCompletionDate: 1,
            briefDescription: 1,
            _id: 0,
          },
        })
        .exec();
    } catch (err) {
      return [];
    }
  }
}
