import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prohub-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
 
  constructor(
    private router: Router,
  ) { }
  CountryName:string;
  countries=[
    {name:'United States'},
    {name:'Brazil'},
    {name:'Germany'}
  ]
  StateName:string;
  states=[
    {name:'California'},
    {name:'Amazonas'},
    {name:'Amazonas'},
  ]
  ngOnInit(): void {
  }

  
  handleMovePage(buttonType: string) {
    const url = buttonType === 'back' ? 'modeofwork' : 'language';
    this.router.navigateByUrl('/auth/signup/individualMemberSignup/steps/'+url);
  }

}
