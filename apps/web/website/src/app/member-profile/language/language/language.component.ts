import { Component, OnInit } from '@angular/core';
interface Level {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'prohub-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  selectedValue: string;
  constructor() { }

  ngOnInit(): void {
  }
  levels: Level[] = [
    {value: 'steak-0', viewValue: 'Level1'},
    {value: 'pizza-1', viewValue: 'Level1'},
    {value: 'tacos-2', viewValue: 'Level1'}
  ];
  FluentLanguage:string;
  languages=[
    {name:'English',level:'Fluent'},
    {name:'English',level:'Fluent'},
    {name:'English',level:'Fluent'}
  ]
}
