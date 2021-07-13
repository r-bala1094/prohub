import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { BudgetDto } from './dto/budget.dto';
import { BudgetService } from './services/budget.service';

@Controller('create-project')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @UseGuards(JwtGaurdService)
  @Put('budget')
  async createUpdateBudget(@Body() budgetDto: BudgetDto) {
    const budgetData = await this.budgetService.createUpdatePrivacy(budgetDto);

    return {
      response: budgetData,
    };
  }
}
