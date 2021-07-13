import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'prohub-experts-count',
  templateUrl: './experts-count.component.html',
  styleUrls: ['./experts-count.component.scss']
})
export class ExpertsCountComponent implements OnInit {
  public readonly expertInfo: FormGroup = new FormGroup({
    selectExpert: new FormControl(),
    numberOfExperts: new FormControl(),
    hireConsultantAndMemberBoth: new FormControl()
  });

  showExpertCount = false;
  
  constructor() { }

  ngOnInit(): void {
    this.expertInfo.valueChanges.subscribe(data => {
      if(data.selectExpert === "2") {
        this.showExpertCount = true;
      } else {
        this.showExpertCount = false;
      }
    })
  }

}
