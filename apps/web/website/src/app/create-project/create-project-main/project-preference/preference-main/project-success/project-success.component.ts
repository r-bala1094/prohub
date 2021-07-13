import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'prohub-project-success',
  templateUrl: './project-success.component.html',
  styleUrls: ['./project-success.component.scss']
})
export class ProjectSuccessComponent implements OnInit {

  someKeyboardConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: [20, 60],
    keyboard: true,  // same as [keyboard]="true"
    step: 1,
    pageSteps: 10,  // number of page steps, defaults to 10
    range: {
      min: 0,
      max: 100
    },
  };

  successInfo: FormGroup= new FormGroup({
    successScore: new FormControl([20,60]),
    earnedAmount: new FormControl(),
    englishLevel: new FormControl()
    
  })

  constructor() { }

  ngOnInit(): void {
  }

}
