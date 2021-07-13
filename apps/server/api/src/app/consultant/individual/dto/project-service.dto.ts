import { IsNotEmpty } from 'class-validator';

export class ProjectAndServiceDto {
  profileId?: string | null;

  projectAndServiceId?: string | null;

  @IsNotEmpty()
  projectAndServiceTitle?: string;

  categories?: Array<{ [key: string]: string }>;

  subCategories?: Array<{ [key: string]: string }>;

  projectDuration?: {
    startDate: Date;
    endDate: Date;
    currentlyWorkingHere: boolean;
  };

  uploadedFiles?: Array<{ [key: string]: string }>;
}
