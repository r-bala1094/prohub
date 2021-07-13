import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'prohub-mode-of-work',
  templateUrl: './mode-of-work.component.html',
  styleUrls: ['./mode-of-work.component.scss']
})
export class ModeOfWorkComponent implements OnInit {
  

  constructor(
    private router: Router,
  ) {
   
   }

  ngOnInit(): void {
  }
  works=['Online Only','In Person' ,'Online or In Person', 'Availibility to travel to other cities']
  
  handleMovePage(buttonType: string) {
    const url = buttonType === 'back' ? 'availability' : 'location';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

}
