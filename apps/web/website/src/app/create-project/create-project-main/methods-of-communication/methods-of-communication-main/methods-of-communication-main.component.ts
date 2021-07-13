import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlSectionService } from '../../../services/control-section.service';

@Component({
  selector: 'prohub-methods-of-communication-main',
  templateUrl: './methods-of-communication-main.component.html',
  styleUrls: ['./methods-of-communication-main.component.scss']
})
export class MethodsOfCommunicationMainComponent implements OnInit {

  methodsInfo: FormGroup = new FormGroup({
    messaging: new FormControl(),
    audio: new FormControl(),
    video: new FormControl()
  })
  isSaved = false;

  constructor(private router: Router, private controlSectionService: ControlSectionService) { }

  ngOnInit(): void {
    this.controlSectionService.getMethodsOfCommunication().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.methodsInfo.setValue({
          messaging: data.messaging,
          audio: data.audio,
          video: data.video
        })
      }
    }, (err: any)=> {
      console.log(err);
    })
  }

  save() {
    this.isSaved = true;
    this.controlSectionService.updateMethodsOfCommunication(this.methodsInfo.value)
  }

  back() {
    this.router.navigateByUrl('/create-project/privacy')
  }

  next() {
    this.save();
    this.router.navigateByUrl('/create-project/budget')
  }

}
