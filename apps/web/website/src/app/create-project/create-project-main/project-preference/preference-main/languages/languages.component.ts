import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlSectionService } from '../../../../services/control-section.service';

@Component({
  selector: 'prohub-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  languageInfo: FormGroup = new FormGroup({
    language: new FormControl,
    level: new FormControl
  })

  languages;
  levels;
  levelProgress = [25, 50, 75, 100];

  selectedLanguages = [];

  constructor(private controlSectionService: ControlSectionService) { }

  ngOnInit(): void {
    this.levels = [{levelId: 1 , level:'Any Level'}, {levelId:2, level: 'Conversation Level'},{ levelId:3, level:'Fluent or Better'}, {levelId:4, level:'Native or Billingual'}];
    this.controlSectionService.getListOfLanguages().subscribe(val => {
      this.languages = val['response'].data;
    }, (err: any)=> {
      console.log(err);
    })
  }

  compareLevel(l1, l2) {
    return l1 && l2 && l1.levelId === l2.levelId
  }

  addLanguage() {
    this.selectedLanguages.push({
      language: this.languages.find(val => val.name === this.languageInfo.controls.language.value),
      level: this.levels.find(val => val.level === this.languageInfo.controls.level.value),
    })
  }

  getProgress(level) {
    return this.levelProgress[this.levels.findIndex(val => val.level === level)];
  }

  removeLanguage(i) {
    this.selectedLanguages.splice(i, 1)
  }

}
