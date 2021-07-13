import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { Types, isValidObjectId } from 'mongoose';
import { CreateProjectService } from './service/create-project.service';

@Controller('create-project')
export class CreateProjectController {
  constructor(private createProjectService: CreateProjectService) {}
  @UseGuards(JwtGaurdService)
  @Get('get-project-id')
  getProject() {
    /** find from databases */
    /** then send to client */
    return {
      response: {
        message: 'New Project Id Created Successfully.',
        statusCode: 200,
        status: true,
        data: Types.ObjectId(),
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('basic-info')
  async getBasicInfo(@Query() query: { projectId: string }) {
    //

    if (!isValidObjectId(query.projectId)) {
      return {
        response: {
          message: 'Id is incorrect.',
          statusCode: 404,
          status: false,
          data: null,
        },
      };
    }
    const basicInfo = await this.createProjectService.getCreatedProjectParts(
      query.projectId,
      {
        basicInfo: 1,
        __v: 0,
      },
      {
        path: 'basicInfo',
        select: {
          basicInfoId: '$_id',
          _id: 0,
          questions: 1,
          files: 1,
          projectTitle: 1,
          startDate: 1,
          proposedCompletionDate: 1,
          approxProposedDuration: 1,
          expertWantToHire: 1,
          hireConsultantAndMemberBoth: 1,
          requireLocalExpert: 1,
          selectedCategory: 1,
          selectedSubCategory: 1,
          selectedSkills: 1,
          selectedObjectives: 1,
          addDeliverables: 1,
          briefDescription: 1,
          anyOtherRequirements: 1,
          requireCoverLetterFromExperts: 1,
        },
        populate: {
          path: 'files',
          model: 'BasicInfoUploadFile',
          select: {
            basicInfoUploadedFileId: '$_id',
            _id: 0,
            fileName: 1,
            fileLocation: 1,
          },
          // select: '_id',
        },
      }
    );

    return {
      response: {
        message: 'Basic Info. Fetched Successfully.',
        statusCode: 200,
        status: true,
        data: basicInfo[0]?.basicInfo || null,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('project-preference')
  async getPrpjectPreference(@Query() query: { projectId: string }) {
    //
    if (!isValidObjectId(query.projectId)) {
      return {
        response: {
          message: 'Id is incorrect.',
          statusCode: 404,
          status: false,
          data: null,
        },
      };
    }
    // AIzaSyAU2rJ3zeTF0OPhYFA5ZUSD7q-M2WtG7lU
    const projectPreference = await this.createProjectService.getCreatedProjectParts(
      query.projectId,
      {
        projectPreference: 1,
        _id: 1,
      },
      {
        path: 'projectPreference',
        select: {
          projectPreferenceId: '$_id',
          projectSuccessScore: 1,
          levelOfExpertise: 1,
          location: 1,
          earnedAmount: 1,
          englishLevel: 1,
          'otherLanguage.objectId': 1,
          'otherLanguage.code': 1,
          'otherLanguage.native': 1,
          'otherLanguage.name': 1,
          'otherLanguage.levelId': 1,
          'otherLanguage.level': 1,

          _id: 0,
        },
      }
    );
    console.log(projectPreference);
    // return projectPreference;
    return {
      response: {
        message: 'Project Pref. Fetched Successfully.',
        statusCode: 200,
        status: true,
        data: projectPreference[0]?.projectPreference || null,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('privacy')
  async getPrivacy(@Query() query: { projectId: string }) {
    //
    if (!isValidObjectId(query.projectId)) {
      return {
        response: {
          message: 'Id is incorrect.',
          statusCode: 404,
          status: false,
          data: null,
        },
      };
    }

    const privactProject = await this.createProjectService.getCreatedProjectParts(
      query.projectId,
      { privacyProject: 1 },
      {
        path: 'privacyProject',
        select: {
          privacyId: '$_id',
          platformToMembers: 1,
          publicToWeb: 1,
          _id: 0,
        },
      }
    );
    // return projectPreference;
    return {
      response: {
        message: 'Privacy Fetched Successfully.',
        statusCode: 200,
        status: true,
        data: privactProject[0]?.privacyProject || null,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('communication')
  async communicationMethods(@Query() query: { projectId: string }) {
    //
    if (!isValidObjectId(query.projectId)) {
      return {
        response: {
          message: 'Id is incorrect.',
          statusCode: 404,
          status: false,
          data: null,
        },
      };
    }

    const communicationMethodData = await this.createProjectService.getCreatedProjectParts(
      query.projectId,
      { communication: 1 },
      {
        path: 'communication',
        select: {
          communicationMethodsId: '$_id',
          audio: 1,
          video: 1,
          messaging: 1,
          _id: 0,
        },
      }
    );
    // return projectPreference;
    return {
      response: {
        message: 'Communication Fetched Successfully.',
        statusCode: 200,
        status: true,
        data: communicationMethodData[0]?.communication || null,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('budget')
  async budget(@Query() query: { projectId: string }) {
    //
    if (!isValidObjectId(query.projectId)) {
      return {
        response: {
          message: 'Id is incorrect.',
          statusCode: 404,
          status: false,
          data: null,
        },
      };
    }

    const budgetData = await this.createProjectService.getCreatedProjectParts(
      query.projectId,
      { budget: 1 },
      {
        path: 'budget',
        select: {
          budgetId: '$_id',
          milestone: 1,
          payByTheHour: 1,
          payByFixedPrice: 1,
          notSure: 1,
          payByHourEstimatedBudget: 1,
          payByFixedPriceSpecificBudget: 1,
          _id: 0,
        },
        populate: {
          path: 'milestone',
          select: {
            milestoneId: '$_id',
            budgetId: 1,
            currencyType: 1,
            platformToMembers: 1,
            description: 1,
            _id: 0,
          },
        },
      }
    );
    // return projectPreference;
    return {
      response: {
        message: 'Budget Fetched Successfully.',
        statusCode: 200,
        status: true,
        data: budgetData[0]?.budget || null,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('work-preference')
  async milestones(@Query() query: { projectId: string }) {
    //
    if (!isValidObjectId(query.projectId)) {
      return {
        response: {
          message: 'Id is incorrect.',
          statusCode: 404,
          status: false,
          data: null,
        },
      };
    }

    const wrokPrefData = await this.createProjectService.getCreatedProjectParts(
      query.projectId,
      { workPreference: 1 },
      {
        path: 'workPreference',
        select: {
          workPrefId: '$_id',
          workWillUnderTaken: 1,
          empProffessional: 1,
          _id: 0,
        },
      }
    );
    // return projectPreference;
    return {
      response: {
        message: 'Work Preference Fetched Successfully.',
        statusCode: 200,
        status: true,
        data: wrokPrefData[0]?.workPreference || null,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Get('created-project')
  async createdProjects(@Query() query: { id: string }) {
    //
    if (!isValidObjectId(query.id)) {
      return {
        response: {
          message: 'Id is incorrect.',
          statusCode: 404,
          status: false,
          data: null,
        },
      };
    }

    const wrokPrefData = await this.createProjectService.getCreatedProject(
      query.id,
      `projectPreference privacyProject communication budget workPreference`
    );
    // return projectPreference;
    return {
      response: {
        message: 'All Project Fetched Successfully.',
        statusCode: 200,
        status: true,
        data: wrokPrefData || null,
      },
    };
  }

  @UseGuards(JwtGaurdService)
  @Post('submit-project')
  async submitProject(
    @Body()
    submitedProject: {
      projectId: string;
      projectSubmitted: boolean;
      status: { public: boolean; private: boolean; invited: boolean };
    }
  ) {
    await this.createProjectService.submitProject(submitedProject);
    // return projectPreference;
    return {
      response: {
        message: 'Project Submmited Successfully.',
        statusCode: 200,
        status: true,
        data: true,
      },
    };
  }
}
