import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoryAndSkills,
  CategoryAndSkillsSchema,
} from './category-skills/category-skills.schema';
import {
  EducationCertification,
  EducationCertificationSchema,
} from './education-certification/education-certification.schema';
import {
  ConsultantIndividualProfile,
  ConsultantIndividualProfileSchema,
} from './profile.schema';
import {
  ProjectAndService,
  ProjectAndServiceSchema,
} from './project-service/project-service.schema';
import {
  WorkExperience,
  WorkExperienceSchema,
} from './work-exp/work-exp.schema';

const moduleSchema = [
  MongooseModule.forFeature([
    {
      name: ConsultantIndividualProfile.name,
      schema: ConsultantIndividualProfileSchema,
    },
    {
      name: WorkExperience.name,
      schema: WorkExperienceSchema,
    },
    {
      name: EducationCertification.name,
      schema: EducationCertificationSchema,
    },
    {
      name: CategoryAndSkills.name,
      schema: CategoryAndSkillsSchema,
    },
    {
      name: ProjectAndService.name,
      schema: ProjectAndServiceSchema,
    },
  ]),
];
@Module({
  imports: [...moduleSchema],
  exports: [...moduleSchema],
})
export class ConsultantIndividualProfileModule {}
