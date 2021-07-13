export class BudgetDto {
  projectId?: string;

  budgetId?: string | null;

  payByTheHour?: boolean; // 1 to 7

  payByFixedPrice?: boolean;

  notSure?: boolean;

  payByHourEstimatedBudget?: {
    typicalHour: boolean;
    ownHourlyRange: {
      selectedCurrency: { currenyId: number; currenyName: string };
      amount: { min: number; max: number };
    };
    maximumWorkingHour: number;
  };

  payByFixedPriceSpecificBudget?: {
    selectedCurrency: { currenyId: number; currenyName: string };
    totalFixedAmount: number;
  };
}
