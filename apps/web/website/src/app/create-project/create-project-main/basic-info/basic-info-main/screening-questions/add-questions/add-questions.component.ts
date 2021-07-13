import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'prohub-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {

  ownQuestion= new FormControl('')

  suggestedQuestions = [{
    ques: 'Do you have any questions about the job description?',
    isChecked: false
  }, {
    ques: 'Do you have suggestions to make this project run successfully?',
    isChecked: false
  }, {
    ques: 'What challenging part of this job are you most experienced in?',
    isChecked: false
  }, {
    ques: 'What part of this project most appeals to you?',
    isChecked: false
  }, {
    ques: 'What past project or job have you had that is most like this one and why?',
    isChecked: false
  }, {
    ques: 'What questions do you have about the project?',
    isChecked: false
  },
]

  showYourOwn=false;
  constructor(public dialogRef: MatDialogRef<AddQuestionsComponent>) { }

  toggleShowOwn() {
    this.showYourOwn = !this.showYourOwn;
  }

  ngOnInit(): void {
  }

  toggleSelection(index) {
    this.suggestedQuestions[index].isChecked = !this.suggestedQuestions[index].isChecked
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    let questions = this.suggestedQuestions.filter(sugg => sugg.isChecked).map(sugg => sugg.ques);
    if(this.showYourOwn) {
      if(this.ownQuestion.value) {
        questions.push(this.ownQuestion.value);
      }
    }
    this.dialogRef.close(questions)
  }
}
