import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { CategoryAndSkills } from './category-skills/category-skills.schema';
import { EducationCertification } from './education-certification/education-certification.schema';
import { WorkExperience } from './work-exp/work-exp.schema';
export type ConsultantIndividualProfileDocument = ConsultantIndividualProfile &
  Document;
import { ProjectAndService } from './project-service/project-service.schema';
@Schema()
export class ConsultantIndividualProfile {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  consultantUserId?: string; // this user id primary of consutant.

  @Prop({
    type: {
      resumeOrCv: {
        type: {
          fileId: String,
          filename: String,
          fileUrl: String,
          uploadedAt: Date,
        },
      },
      importType: {
        aboutMe: Boolean,
        experiences: Boolean,
        educations: Boolean,
        skills: Boolean,
      },
    },
  })
  uploadCv?: {
    resumeOrCv: {
      fileId: string;
      filename: string;
      fileUrl: string;
      uploadedAt: Date;
    };
    importType: {
      aboutMe: boolean;
      experiences: boolean;
      educations: boolean;
      skills: boolean;
    };
  };

  @Prop({
    type: {
      profilePic: {
        type: {
          fileId: String,
          filename: String,
          fileUrl: String,
          uploadedAt: Date,
        },
      },
      name: {
        firstname: String,
        surname: String,
      },
    },
  })
  profileInfo?: {
    profilePic: {
      fileId: string;
      filename: string;
      fileUrl: string;
      uploadedAt: Date;
    };
    name: {
      firstname: string;
      surname: string;
    };
  };

  @Prop({ type: String })
  aboutMe?: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'WorkExperience' }],
  })
  workExpList?: WorkExperience;

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'EducationCertification' },
    ],
  })
  EducationCertificationList?: EducationCertification;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CategoryAndSkills',
  })
  categoryAndSkillsId?: CategoryAndSkills;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ProjectAndService' }],
  })
  projectAndServicesList?: ProjectAndService;
}

export const ConsultantIndividualProfileSchema = SchemaFactory.createForClass(
  ConsultantIndividualProfile
);
