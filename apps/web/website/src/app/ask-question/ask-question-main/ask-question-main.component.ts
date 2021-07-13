import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'prohub-ask-question-main',
  templateUrl: './ask-question-main.component.html',
  styleUrls: ['./ask-question-main.component.scss']
})
export class AskQuestionMainComponent implements OnInit {
  input: boolean = false;
    
    constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navigateTo(pageType: string) {
    this.router.navigate([pageType]);
  }

  users:any=[
    { firstName: 'Frank', id: 1, showInput: false },
    { firstName: 'Vic', id: 2, showInput: false },
    { firstName: 'Gina', id: 3, showInput: false },
    { firstName: 'Jessi', id: 4, showInput: false },
    { firstName: 'Jay', id: 5, showInput: false }
    ]

  showDetail(index) {
  }

  sendMessage(message: string) {
    console.log('sent-message', message)
  }



}
