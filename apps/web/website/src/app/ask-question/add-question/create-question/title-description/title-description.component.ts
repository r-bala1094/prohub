import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-title-description',
  templateUrl: './title-description.component.html',
  styleUrls: ['./title-description.component.scss']
})
export class TitleDescriptionComponent implements OnInit {

  titleForm: FormGroup = new FormGroup ({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

}
