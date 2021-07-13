import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { BasicInfo } from './basic-info/basic-info.schema';
import { Budget } from './budget/budget.schema';
import { Communication } from './communication/communication.schema';

import { PrivacyProject } from './privacy/privacy.schema';
import { ProjectPreference } from './project-preference/project-preference.schema';
import { WorkPreference } from './work-preference/work-preference.schema';

export type CreateProjectDocument = CreateProject & Document;

@Schema()
export class CreateProject {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'BasicInfo',
  })
  basicInfo?: BasicInfo;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ProjectPreference',
  })
  projectPreference?: ProjectPreference;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PrivacyProject',
  })
  privacyProject?: PrivacyProject;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Communication',
  })
  communication?: Communication;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Budget',
  })
  budget?: Budget;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'WorkPreference',
  })
  workPreference?: WorkPreference;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  userId?: string;

  @Prop({ type: Date })
  createdAt?: string;

  @Prop({ type: Date })
  modifiedAt?: string;

  @Prop({ type: Date })
  submittedDate?: string;

  @Prop({ type: Boolean })
  submmited?: boolean;

  @Prop({
    type: {
      public: Boolean,
      private: Boolean,
      invited: Boolean,
    },
  })
  status?: {
    public: boolean;
    private: boolean;
    invited: boolean;
  };
}

export const CreateProjectSchema = SchemaFactory.createForClass(CreateProject);
