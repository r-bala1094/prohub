import { IsNotEmpty } from 'class-validator';

export class WorkPreferenceDto {
  @IsNotEmpty()
  projectId: string;

  workPrefId: string;

  workWillUnderTaken?: Array<number>;

  empProffessional?: number;
}
