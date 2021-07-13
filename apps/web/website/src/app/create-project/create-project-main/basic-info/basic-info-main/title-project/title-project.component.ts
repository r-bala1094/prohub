import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'prohub-title-project',
  templateUrl: './title-project.component.html',
  styleUrls: ['./title-project.component.scss']
})
export class TitleProjectComponent implements OnInit {

  public readonly titleInfo: FormGroup = new FormGroup({
    projectTitle: new FormControl(),
    startDate: new FormControl(),
    proposedCompletionDate: new FormControl(),
    approxProposedDuration : new FormControl()
  });
  

  constructor() {
   }

  ngOnInit(): void {
  }

}
