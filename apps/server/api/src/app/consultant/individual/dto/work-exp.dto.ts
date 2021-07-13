export class WorkExpDto {
  workExperienceId?: string;

  title?: string;

  employementType?: { employementTypeId: number; employementType: string };

  companyName?: string;

  location?: { lat: number; long: number; locationName: string };

  workedDur?: { startDate: Date; endDate: Date; curentlyWorkedHere: boolean };

  description?: string;

  profileId?: string;
}
