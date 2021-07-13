import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Budget, BudgetDocument } from '@prohub/database-schema';
import { Model } from 'mongoose';
import { CreateProjectService } from '../../service/create-project.service';
import { BudgetDto } from '../dto/budget.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Budget.name)
    private budgetModel: Model<BudgetDocument>,
    private createProjectService: CreateProjectService
  ) {}

  async createUpdatePrivacy(budgetDto: BudgetDto) {
    const { projectId, budgetId } = budgetDto;

    if (!budgetId) {
      try {
        const createPrivacy = await this.directSave(budgetDto);

        const { _id } = createPrivacy;

        /** create  */
        /**check exists in document of create project */
        const documentExists = await this.createProjectService.checkExistsDocument(
          projectId
        );

        if (documentExists) {
          //

          this.createProjectService.updateDocument(projectId, {
            $set: { budget: _id },
          });
        } else {
          //
          this.createProjectService.createProjectDocument(
            projectId,
            _id,
            'budget'
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
      await this.updateBudget(budgetDto);
      return {
        message: 'Privacy saved Successfully.',
        status: true,
        type: 'saved',
        statusCode: 200,
        data: budgetId,
      };

      //   const updateBasic = await this.updateBasicInfo(basicInfoDto);
      // return this.createProjectService.getAll();
    }
    /**/
  }

  async directSave(budgetDto: BudgetDto) {
    /** */

    const basicModel = new this.budgetModel(budgetDto);
    return basicModel.save();
  }

  async updateBudget(budgetDto: BudgetDto) {
    const { budgetId } = budgetDto;
    return this.budgetModel
      .updateOne({ _id: budgetId }, budgetDto as any)
      .exec();
    /**/
  }
}
