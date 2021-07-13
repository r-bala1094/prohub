import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlSectionService } from '../../../services/control-section.service';

@Component({
  selector: 'prohub-privacy-main',
  templateUrl: './privacy-main.component.html',
  styleUrls: ['./privacy-main.component.scss']
})
export class PrivacyMainComponent implements OnInit {

  privacy = new FormControl();
  isSaved = false;

  constructor(private router: Router, private controlSectionService: ControlSectionService) { }

  ngOnInit(): void {
    this.controlSectionService.getPrivacy().subscribe(val => {
      if(val['response'].data) {
        this.privacy.setValue(val['response'].data.publicToWeb ? '1' : '2');
      }
    }, (err: any)=> {
      console.log(err);
    })
  }

  save() {
    this.isSaved = true;
    let privacy = {
      publicToWeb: this.privacy.value === '1',
      platformToMembers: this.privacy.value === '2'
    }
    this.controlSectionService.updatePrivacy(privacy);
  }

  back() {
    this.router.navigateByUrl('/create-project/project-preference')
  }

  next() {
    this.save();
    this.router.navigateByUrl('/create-project/methods-of-communication')
  }

}
