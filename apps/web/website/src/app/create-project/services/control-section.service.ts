import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const apiUrl = 'http://52.62.11.193:5000/api/';

@Injectable()
export class ControlSectionService {

  constructor(private http: HttpClient) { }

  authToken: string = '';


  options = {};

  projectId = '';
  basicInfoId = '';
  filesListFromClient = [];
  filesListFromServer = [];
  projectPreferenceId = '';
  privacyId = '';
  communicationMethodsId = '';
  budgetId = '';
  workPrefId = '';
  milestoneId = '';
  basicInfo;
  budget;
  methodsOfCommunication;
  privacy;
  projectPreference;
  workingPreference;
  milestones;

  login() {

    const body = {
      "email" :"vidya@gmail.com",
      "password": "1234",
      "accountType" : "CONSULTANT"
  }
    return this.http.post(apiUrl + 'auth/login', body, this.options)
  }

  setToken(token) {
    this.authToken = token;
    this.options = {
      headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
     })
    }
  }

  getProjectId() {
    console.log(this.options)
    return this.http.get(apiUrl + 'create-project/get-project-id', this.options);
  }

  checkProjectId() {
    return this.projectId;
  }

  setProjectId(id) {
    this.projectId = id;
  }

  getListOfCategories(searchWord='') {
    return this.http.get(apiUrl + 'list/category?where[search]=' + searchWord + '&where[limit]=50&', this.options);
  }

  getListOfSubCategories(categoryIds) {
    let params = categoryIds.map(id => {
      return '&where[categoryIds][0][categoryId]=' + id
    })
    return this.http.get(apiUrl + 'list/subcategory?where[limit]=50' + params.join(''), this.options);
  }

  getListOfSkills(categoryIds, subCategoryIds) {
    let catParams = categoryIds.map(id => {
      return '&where[categoryIds][0][categoryId]=' + id
    })
    let subcatParams = subCategoryIds.map(id => {
      return '&where[subCategoryIds][0][subCategoryId]=' + id
    })
    return this.http.get(apiUrl + 'list/skills?where[limit]=50' + catParams.join('') + subcatParams.join(''), this.options);
  }

  getListOfCountries() {
    return this.http.get(apiUrl + 'list/country?where[name]=&where[limit]=10&where[code]');
  }

  getListofDeliverables() {
    return this.http.get(apiUrl + 'list/deliverable?where[search]=&where[limit]=50', this.options);
  }

  getListOfLanguages() {
    return this.http.get(apiUrl + 'list/language?where[name]=&where[limit]=10&where[code]&where[native]', this.options);
  }

  getListOfCurrency() {
    return this.http.get(apiUrl + 'list/currency-phone', this.options)
  }

  getBasicInfo () {
    return this.http.get(apiUrl + 'create-project/basic-info?projectId=' + this.projectId, this.options);
  }

  updateBasicInfo (value) {
    this.basicInfo = value;
    let body = {
      projectId : this.projectId,
      basicInfoId: this.basicInfoId,
     ...value
    }
    this.http.post(apiUrl + 'create-project/basic-info',body,  this.options).subscribe(val => {
      this.basicInfoId =val['response'].data;
    }, (err: any)=> {
      console.log(err);
    })
  }

  uploadBasicInfoFiles() {
      // create body of the request
      const formData = new FormData;
      this.filesListFromClient.forEach(element => {
        console.log(element)
        formData.append('file', element);
      });

      // create options of the request

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authToken,
        'Access-Control-Allow-Origin': '*',
      });

      const options = { headers: headers };

      this.http.post(apiUrl + 'create-project/basic-info/upload-file', formData, options).subscribe((val: any) => {
        console.log(val)
        this.filesListFromServer = val.response.data;
      }, (err: any) => {
        console.log(err);
      })
  }


  getProjectPreference () {
    return this.http.get(apiUrl + 'create-project/project-preference?projectId=' + this.projectId, this.options)
  }

  updateProjectPreference (value) {
    this.projectPreference = value;
    let body  = {
      projectId: this.projectId,
      projectPreferenceId: this.projectPreferenceId,
      ...value
    }
    this.http.put(apiUrl + 'create-project/project-preference', body, this.options).subscribe(val => {
      this.projectPreferenceId = val['response'].data;
    }, (err: any)=> {
      console.log(err);
    })
  }

  getPrivacy () {
    return this.http.get(apiUrl + 'create-project/privacy?projectId=' + this.projectId, this.options);
  }

  updatePrivacy (value) {
    this.privacy = value;
    let body = {
      projectId: this.projectId,
      privacyId: this.privacyId,
      ...value
    };

    this.http.put(apiUrl + 'create-project/privacy', body, this.options).subscribe(val => {
      this.privacyId = val['response'].data;
    }, (err: any)=> {
      console.log(err);
    })
  }

  getMethodsOfCommunication () {
    return this.http.get(apiUrl + 'create-project/communication?projectId=' + this.projectId, this.options);
  }

  updateMethodsOfCommunication (value) {
    this.methodsOfCommunication = value;
    let body = {
      projectId: this.projectId,
      communicationMethodsId: this.communicationMethodsId,
      ...value
    }

    this.http.put(apiUrl + 'create-project/communication-methods', body, this.options).subscribe(val => {
      this.communicationMethodsId = val['response'].data;
    }, (err: any)=> {
      console.log(err);
    })
  }

  getBudget() {
    return this.http.get(apiUrl + 'create-project/budget?projectId=' + this.projectId, this.options);
  }

  updateBudget(value) {
    this.budget = value;
    let body = {
      projectId: this.projectId,
      budgetId: this.budgetId,
      ...value
    }

    this.http.put(apiUrl + 'create-project/budget', body, this.options).subscribe(val => {
      this.budgetId = val['response'].data
    }, (err: any)=> {
      console.log(err);
    })
  }

  getWorkingPreference () {
    return this.http.get(apiUrl + 'create-project/work-preference?projectId=' + this.projectId, this.options);
  }

  updateWorkingPreference (value) {
    this.workingPreference = value;
    let body = {
      projectId: this.projectId,
      workPrefId: this.workPrefId,
      ...value
    }
    this.http.put(apiUrl + 'create-project/work-preference', body, this.options).subscribe(val => {
      this.workPrefId = val['response'].data;
    }, (err: any)=> {
      console.log(err);
    });
  }

  getMilestones () {
    return this.http.get(apiUrl + 'create-project/milestone?projectId=' + this.projectId, this.options);
  }

  updateMilestones (value, milestoneId) {
    this.milestones = value;
    let body = {
      projectId: this.projectId,
      milestoneId: milestoneId,
      ...value
    }
    this.http.put(apiUrl + 'create-project/milestone', body, this.options).subscribe(val => {
      this.milestoneId = val['response'].data;
    }, (err: any)=> {
      console.log(err);
    });
  }

  deleteMilestone(milestoneId) {
    return this.http.delete(apiUrl + 'create-project/milestone?milestoneId=' + milestoneId, this.options)
  }

  submitProject() {
    let body = {
      projectId: this.projectId,
      projectSubmitted: true,
      status: {
          public : true,
          private :false,
          invited: false
      }
    }
    this.http.post(apiUrl + 'create-project/submit-project',body , this.options).subscribe(val => {
      console.log(val)
    }, (err: any)=> {
      console.log(err);
    });
  }
}
