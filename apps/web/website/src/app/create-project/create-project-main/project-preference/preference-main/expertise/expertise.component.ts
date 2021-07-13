import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'prohub-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss']
})
export class ExpertiseComponent implements OnInit {

  locations = []

  expertiseInfo: FormGroup = new FormGroup({
    selectExpertise: new FormControl(),
    location: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
    this.locations = ['India', 'US', 'UK', 'Germany']
  }

}
