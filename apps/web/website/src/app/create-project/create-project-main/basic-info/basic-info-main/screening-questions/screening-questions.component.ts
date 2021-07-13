import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

@Component({
  selector: 'prohub-screening-questions',
  templateUrl: './screening-questions.component.html',
  styleUrls: ['./screening-questions.component.scss']
})
export class ScreeningQuestionsComponent implements OnInit {

  screeningInfo: FormGroup = new FormGroup({
    questions: new FormArray([]),
    requireCoverLetterFromExperts: new FormControl(false)
  })

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addItem() {
    const addQuestionDialogRef = this.dialog.open(AddQuestionsComponent);

    addQuestionDialogRef.afterClosed().subscribe(val => {
      const items = this.screeningInfo.get('questions') as FormArray;

      val.map(ques => {
        const item = new FormGroup({
          question: new FormControl(ques)
        })
        items.push(item);
      })
    })
  }

  deleteItem(index) {
    const items = this.screeningInfo.get('questions') as FormArray;
    items.removeAt(index);
  }

  getControls() {
    return (this.screeningInfo.get('questions') as FormArray).controls;
  }

}
