import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlSectionService } from '../../create-project/services/control-section.service';

@Component({
  selector: 'prohub-milestones-main',
  templateUrl: './milestones-main.component.html',
  styleUrls: ['./milestones-main.component.scss']
})
export class MilestonesMainComponent implements OnInit {

  milestoneNumber = 1;
  currency = [];
  milestones = [];

  milestoneInfo: FormGroup = new FormGroup({
    amount: new FormControl(),
    selectedCurrency: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    description: new FormControl(),
  })

  constructor(private controlSectionService: ControlSectionService) { }

  ngOnInit(): void {
    this.controlSectionService.getListOfCurrency().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.currency = data;
      }
    })
    this.controlSectionService.getMilestones().subscribe(val => {
      console.log(val);
      let data = val['response'].data;
      if(data.length) {
        this.milestones = data;
      } else {
        this.milestones = [{
          edit:true
        }]
      }
    })
  }

  compare(obj1, obj2) {
    return obj1 && obj2 && obj1.objectId === obj2.objectId;
  }

  addMilestone(i) {
    let value = {
      currencyType: this.milestoneInfo.value.selectedCurrency,
      platformToMembers: {
        startDate: this.milestoneInfo.value.startDate?.toString(),
        endDate: this.milestoneInfo.value.endDate?.toString()
      },
      description: this.milestoneInfo.value.description
    }
    this.controlSectionService.updateMilestones(value, this.milestones[i].milestoneId);
    this.controlSectionService.getMilestones().subscribe(val => {
      console.log(val);
      let data = val['response'].data;
      if(data) {
        this.milestones = data;
      }
    })
  }
  
  addNew(i) {
    this.milestoneInfo.setValue({
      amount: '',
      selectedCurrency: '',
      startDate: '',
      endDate: '',
      description: ''
    })
    this.milestones.splice(i+1, 0, {edit: true});
  }

  remove(i) {
    if(this.milestones[i].milestoneId){
      this.controlSectionService.deleteMilestone(this.milestones[i].milestoneId).subscribe(val => {
        this.controlSectionService.getMilestones().subscribe(val => {
          console.log(val);
          let data = val['response'].data;
          if(data) {
            this.milestones = data;
          }
        })
      });
    } else {
      this.milestones.splice(i, 1);
    }
  }

  reset() {
    this.milestoneInfo.setValue({
      amount: '',
      selectedCurrency: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  edit(i) {
    this.milestoneInfo.setValue({
      amount: '',
      selectedCurrency: this.milestones[i].currencyType,
      startDate: new Date(this.milestones[i].platformToMembers.startDate),
      endDate: new Date(this.milestones[i].platformToMembers.endDate),
      description: this.milestones[i].description
    })
    this.milestones[i].edit = true;
  }

}
