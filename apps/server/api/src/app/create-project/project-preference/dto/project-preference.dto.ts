import { IsNotEmpty } from 'class-validator';

export class ProjectPreferenceDto {
  @IsNotEmpty()
  projectId?: string;

  projectPreferenceId: string;

  levelOfExpertise?: number; // 1 to 7

  location?: { id: string; locationName: string };

  projectSuccessScore?: { min: number; max: number };

  earnedAmount?: number; // 1 to 4

  englishLevel?: number; // 1 to 4

  otherLanguage?: Array<{
    languageId: number;
    language: string;
    levelId: number;
    level: string;
  }>;
}
