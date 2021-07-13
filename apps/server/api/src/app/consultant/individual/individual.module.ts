import { Module } from '@nestjs/common';
import {
  AwsS3Module,
  GaurdsModule,
  RedisModule,
  RedisService,
} from '@prohub/database-core';
import { ConsultantIndividualProfileModule } from '@prohub/database-schema';
import { AboutMeController } from './controllers/about-me.controller';
import { CategoryAndSkills } from './controllers/category-skills.controller';
import { EducationCertificationController } from './controllers/education-certification.controller';
import { ProfileInfoController } from './controllers/profile-info.cotroller';
import { ProjectAndServiceController } from './controllers/project-services.controller';
import { uploadCvController } from './controllers/uploadCv.controller';
import { WorkExperienceController } from './controllers/work-exp.controller';
import { AboutMeService } from './services/about-me.service';
import { CategoryAndSkillsService } from './services/category-skills.service';
import { EducationCertificationService } from './services/education-certification.service';
import { ProfileInfoService } from './services/profile-info.service';
import { ProjectAndServiceService } from './services/project-services.service';
import { UploadCvService } from './services/uploadCv.service';
import { WorkExperienceService } from './services/work-exp.service';

@Module({
  imports: [
    AwsS3Module,
    GaurdsModule,
    RedisModule,
    ConsultantIndividualProfileModule,
  ],
  controllers: [
    uploadCvController,
    ProfileInfoController,
    AboutMeController,
    WorkExperienceController,
    EducationCertificationController,
    CategoryAndSkills,
    ProjectAndServiceController,
  ],
  providers: [
    { provide: 'REDIS', useClass: RedisService },
    UploadCvService,
    ProfileInfoService,
    AboutMeService,
    WorkExperienceService,
    EducationCertificationService,
    CategoryAndSkillsService,
    ProjectAndServiceService,
  ],
})
export class IndividualProfile {}
