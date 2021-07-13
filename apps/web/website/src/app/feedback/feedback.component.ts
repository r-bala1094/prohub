import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'prohub-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  public readonly feedbackForm: FormGroup = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    number: new FormControl(),
  })
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  
  constructor(){}

  ngOnInit(): void {
  
  }
  feedback:any;
  feeds = [
    {id:1,name:'Navigation'},
    {id:2,name:'Functionality'},
    {id:3,name:'Content'},
    {id:4,name:'Ease of use'},
    {id:5,name:'Improvements'},
    {id:6,name:'Other'},
  ];

}
