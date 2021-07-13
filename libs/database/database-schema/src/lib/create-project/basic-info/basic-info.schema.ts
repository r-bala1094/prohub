import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { BasicInfoUploadFile } from './upload-file.schema';

export type BasicInfoDocument = BasicInfo & Document;

@Schema()
export class BasicInfo {
  @Prop({ type: String, required: false })
  projectTitle?: string;

  @Prop({ type: Date, required: false })
  startDate?: Date;

  @Prop({ type: Date, required: false })
  proposedCompletionDate?: Date;

  @Prop({ type: Number, required: false })
  approxProposedDuration?: number;
  @Prop({
    type: {
      single: { type: Boolean },

      multiple: { type: Boolean },

      numberOfExperts: { type: Number },
    },
    required: false,
  })
  expertWantToHire?: {
    single: boolean;
    multiple: boolean;
    numberOfExperts: number;
  };

  @Prop({ type: Boolean, required: false })
  hireConsultantAndMemberBoth?: boolean;

  @Prop({ type: Boolean, required: false })
  requireLocalExpert?: boolean;

  @Prop({ type: { id: String, catergoryName: String }, required: false })
  selectedCategory?: { catergoryId: string; category: string };

  @Prop({
    type: {
      catergoryId: String,
      subCategoryId: String,
      subCategory: String,
    },
  })
  selectedSubCategory?: {
    catergoryId: string;
    subCategoryId: string;
    subCategory: string;
  };

  @Prop({ type: { id: String, skillName: String } })
  selectedSkills?: { skillId: string; skill: string };

  @Prop({ type: { id: String, objectiveName: String } })
  selectedObjectives?: { catergoryId: string; category: string };

  @Prop({ type: { id: String, deliverableName: String } })
  addDeliverables?: { deliverableId: string; deliverable: string };

  @Prop({ type: String })
  briefDescription?: string;

  @Prop({
    // required: true,
    type: [
      {
        type: MongooseSchema.Types.ObjectId,

        ref: 'BasicInfoUploadFile',
      },
    ],
  })
  files?: BasicInfoUploadFile;

  @Prop({ type: String })
  anyOtherRequirements?: string;

  @Prop({ type: [String] })
  questions?: Array<string>;

  @Prop({ type: Boolean })
  requireCoverLetterFromExperts?: boolean;
}

export const BasicInfoSchema = SchemaFactory.createForClass(BasicInfo);
