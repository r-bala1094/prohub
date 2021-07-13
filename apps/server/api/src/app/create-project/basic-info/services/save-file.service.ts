import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BasicInfoUploadFile,
  BasicInfoUploadFileDocument,
} from '@prohub/database-schema';
import { Model, Types } from 'mongoose';
import { CreateProjectService } from '../../service/create-project.service';

class FileModel {
  constructor(
    public ETag: string,
    public fileName: string,
    public fileLocation: string,
    public userId?: Types.ObjectId,
    public createAt?: string,
    public modifiedAt?: string
  ) {
    this.createAt = new Date().toISOString();
    this.modifiedAt = new Date().toISOString();
  }
}

@Injectable()
export class BasicInfoSaveService {
  constructor(
    @InjectModel(BasicInfoUploadFile.name)
    private basicInfoUploadFileModel: Model<BasicInfoUploadFileDocument>,
    private createProjectService: CreateProjectService
  ) {}

  async saveFile(
    files: Array<Promise<{ [key: string]: string }>>
  ): Promise<Array<Promise<{ [key: string]: string }>> | BadRequestException> {
    /** */
    try {
      const filesArray = await Promise.all(files);
      const filesObject = filesArray.map(async (file) => {
        /**
         * for checking the project and basic info exists
         */

        const { ETag, Location, Key } = file;
        const fileModel: FileModel = new FileModel(ETag, Key, Location);

        const dbModel = new this.basicInfoUploadFileModel(fileModel);

        const { _id, fileName, fileLocation } = await dbModel.save();

        return { basicInfoUploadedFileId: _id, fileName, fileLocation };
      });
      return await Promise.all(filesObject as Array<any>);
      /** */
    } catch (err) {
      return new BadRequestException('Unable to upload files.');
    }
  }
}
