import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlSectionService } from '../../../services/control-section.service';

@Component({
  selector: 'prohub-working-preference-main',
  templateUrl: './working-preference-main.component.html',
  styleUrls: ['./working-preference-main.component.scss']
})
export class WorkingPreferenceMainComponent implements OnInit {

  workingInfo: FormGroup = new FormGroup({
    professional: new FormControl(),
    onlineOnly: new FormControl(),
    inPerson: new FormControl(),
    onlineOrInPerson: new FormControl(),
    availableToTravel: new FormControl()
  });

  isSaved = false;

  mapping =  [{name: 'onlineOnly', val: 1}, {name: 'inPerson', val: 2}, {name: 'onlineOrInPerson', val: 3}, {name: 'availableToTravel', val: 4}]


  constructor(private router: Router, private controlSectionService: ControlSectionService) { }

  ngOnInit(): void {
    this.controlSectionService.getWorkingPreference().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.workingInfo.setValue({
          professional: '' + data.empProffessional,
          onlineOnly: data.workWillUnderTaken.includes(1),
          inPerson:data.workWillUnderTaken.includes(2),
          onlineOrInPerson:data.workWillUnderTaken.includes(3),
          availableToTravel: data.workWillUnderTaken.includes(4)
        })
      }
    }, (err: any)=> {
      console.log(err);
    })
  }

  save() {
    this.isSaved = true;
    let working = {
      workWillUnderTaken:this.mapping.filter(data => {
        return this.workingInfo.value[data.name]
      }).map(data => data.val),
      empProffessional: Number(this.workingInfo.value.professional)
    }
    this.controlSectionService.updateWorkingPreference(working);
  }

  back() {
    this.router.navigateByUrl('/create-project/budget')
  }

  next() {
    this.save();
    this.router.navigateByUrl('/create-project/review')
  }

}
