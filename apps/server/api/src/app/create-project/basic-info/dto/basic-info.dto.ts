import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

class ExpertToHire {
  single: boolean;

  multiple: boolean;

  numberOfExerts: number;
}

class SelectCategory {
  id: string;
  catergoryName: string;
}

class SelectSubCategory {
  catergoryId: string;
  subCategoryId: string;
  subCategoryName: string;
}

class SelectSkills {
  id: string;
  skillName: string;
}

class SelectObjectives {
  id: string;
  objectiveName: string;
}

class AddDeliverables {
  id: string;
  deliverableName: string;
}
export class BasicInfoDto {
  @IsNotEmpty()
  projectId: string;

  basicInfoId: string;

  @IsNotEmpty()
  projectTitle: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  proposedCompletionDate: Date;

  @IsNotEmpty()
  @IsNumber()
  approxProposedDuration: number; // 1 to 6

  @Type(() => ExpertToHire)
  expertWantToHire: ExpertToHire;

  hireConsulatntAndMemberBoth: boolean;
  requireLocalExpert: boolean;

  @Type(() => SelectCategory)
  selectedCategory: Array<SelectCategory>;

  @Type(() => SelectSubCategory)
  selectedSubCategory: Array<SelectSubCategory>;

  @Type(() => SelectSkills)
  selectedSkills: Array<SelectSkills>;

  @Type(() => SelectObjectives)
  selectedObjectives: Array<SelectObjectives>;

  @Type(() => AddDeliverables)
  addDeliverables: Array<AddDeliverables>;

  briefDescription: string;

  files: Array<string>;

  anyOtherRequirements: string;

  questions: Array<string>;

  requireCoverLetterFromExperts: boolean;
}
