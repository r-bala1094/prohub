export class MilestoneDto {
  projectId?: string;

  milestoneId?: string;

  currencyType?: { currencyType: string; amount: number }; // 1 to 7

  platformToMembers?: { startDate: Date; endDate: Date };

  description?: string;
}
