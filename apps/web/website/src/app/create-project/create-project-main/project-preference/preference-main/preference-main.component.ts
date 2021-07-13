import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ControlSectionService } from '../../../services/control-section.service';

@Component({
  selector: 'prohub-preference-main',
  templateUrl: './preference-main.component.html',
  styleUrls: ['./preference-main.component.scss']
})
export class PreferenceMainComponent implements OnInit {

  @ViewChild('expertiseComp') expertiseComp;
  @ViewChild('successComp') successComp;
  @ViewChild('languagesComp') languagesComp;
  isSaved = false;

  constructor(private router: Router, private controlSectionService: ControlSectionService) { }

  ngOnInit(): void {
    this.controlSectionService.getProjectPreference().subscribe(val => {
      let data = val['response'].data;
      if(data) {
        this.expertiseComp.expertiseInfo.setValue({
          selectExpertise: '' + data.levelOfExpertise,
          location: data.location
        })
        this.successComp.successInfo.setValue({
          successScore: [data.projectSuccessScore.min, data.projectSuccessScore.max],
          earnedAmount: '' + data.earnedAmount,
          englishLevel: '' + data.englishLevel
        })
        this.languagesComp.selectedLanguages = data.otherLanguage.map(lang => ({
          language: {
            objectId: lang.objectId,
            name: lang.name,
            code: lang.code,
            native: lang.native
          },
          level: {
            levelId: lang.levelId,
            level: lang.level
          },
        }))
      }
    }, (err: any)=> {
      console.log(err);
    })
  }
  
  save() {
    this.isSaved = true;
    let projPref = {
      levelOfExpertise: Number ( this.expertiseComp.expertiseInfo.value.selectExpertise),
      location: this.expertiseComp.expertiseInfo.value.location,
      projectSuccessScore: {
        min: this.successComp.successInfo.value.successScore[0],
        max: this.successComp.successInfo.value.successScore[1]
      } ,
      earnedAmount: Number ( this.successComp.successInfo.value.earnedAmount ),
      englishLevel: Number ( this.successComp.successInfo.value.englishLevel ),
      otherLanguage: this.languagesComp.selectedLanguages.map(val => ({
        ...val.language,
        ...val.level
      }))
    }
    this.controlSectionService.updateProjectPreference(projPref);
  }

  back() {
    this.router.navigateByUrl('/create-project')
  }

  next() {
    this.save();
    this.router.navigateByUrl('/create-project/privacy')
  }

}
