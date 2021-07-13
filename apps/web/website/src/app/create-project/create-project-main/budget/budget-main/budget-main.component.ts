import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlSectionService } from '../../../services/control-section.service';

@Component({
  selector: 'prohub-budget-main',
  templateUrl: './budget-main.component.html',
  styleUrls: ['./budget-main.component.scss']
})
export class BudgetMainComponent implements OnInit {

  currency = [];
  isSaved = false;
  
  budgetInfo: FormGroup = new FormGroup({
    budget: new FormControl(),
    estimatedBudget: new FormControl(),
    selectedCurrency: new FormControl(),
    minAmount: new FormControl(0),
    maxAmount: new FormControl(0),
    maxWorkingHours: new FormControl(8),
    fixedAmount: new FormControl()
  })

  constructor(private router: Router, private controlSectionService: ControlSectionService) { }

  ngOnInit(): void {
    this.controlSectionService.getListOfCurrency().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.currency = data;
      }
    })
    this.controlSectionService.getBudget().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.budgetInfo.setValue({
          budget: data.payByTheHour ? '1' : data.payByFixedPrice ? '2' : '3',
          estimatedBudget: data.payByHourEstimatedBudget.typicalHour ? '1' : '2',
          selectedCurrency : data.payByTheHour ? data.payByHourEstimatedBudget.ownHourlyRange.selectedCurrency : data.payByFixedPriceSpecificBudget.selectedCurrency,
          minAmount: data.payByHourEstimatedBudget.ownHourlyRange.amount.min,
          maxAmount: data.payByHourEstimatedBudget.ownHourlyRange.amount.max,
          maxWorkingHours: data.payByHourEstimatedBudget.maximumWorkingHour,
          fixedAmount: data.payByFixedPriceSpecificBudget.totalFixedAmount
        })
      }
    }, (err: any)=> {
      console.log(err);
    })
  }

  compare(obj1, obj2) {
    return obj1 && obj2 && obj1.objectId === obj2.objectId;
  }

  save() {
    this.isSaved = true;
    let budget = {
      payByTheHour: this.budgetInfo.value.budget === '1',
      payByFixedPrice: this.budgetInfo.value.budget  === '2',
      notSure: this.budgetInfo.value.budget === '3',
      payByHourEstimatedBudget: {
        typicalHour: this.budgetInfo.value.estimatedBudget === '1',
        ownHourlyRange: {
          selectedCurrency: this.budgetInfo.value.selectedCurrency,
          amount: {
            min: this.budgetInfo.value.minAmount,
            max: this.budgetInfo.value.maxAmount
          }
        },
        maximumWorkingHour: this.budgetInfo.value.maxWorkingHours
      },
      payByFixedPriceSpecificBudget: {
        selectedCurrency: this.budgetInfo.value.selectedCurrency,
        totalFixedAmount: this.budgetInfo.value.fixedAmount
      }
    }
    this.controlSectionService.updateBudget(budget)
  }

  back() {
    this.router.navigateByUrl('/create-project/methods-of-communication');
  }

  next() {
    this.save();
    this.router.navigateByUrl('/create-project/working-preference')
  }

}
