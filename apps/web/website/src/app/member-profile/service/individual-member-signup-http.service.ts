import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'http://52.62.11.193:5000/api/';
const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impob25kb2VAZ21haWwuY29tIiwiYWNjb3VudFR5cGUiOiJDT05TVUxUQU5UIiwiX2lkIjoiNjBiNjRjZjg1MzE3OGY1YjQ3M2M4MzFkIiwiaWF0IjoxNjIyODc1OTkwfQ.jWGUOKxySEU9IJnfte6pg1TI5gPe-3WEMCToemUDa3c';


@Injectable({providedIn: 'root'})
export class IndividualMemberSignupHttpService {

  authToken: string;
  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('UserAuthToken');
   }


  // uplaod CV

  getUploadCv() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };

    return this.http.get(apiUrl + 'consultant-individual-profile/get-uploaded-cv', options).pipe(
      catchError(this.handleError)
    );
  }

  postUploadCv(body) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.post(apiUrl + 'consultant-individual-profile/uploadCv', body, options).pipe(
      catchError(this.handleError)
    );

  }

  // profile info

  getProfileInfo() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'consultant-individual-profile/profile-info', options).pipe(
      catchError(this.handleError)
    );
  }

  putProfileInfo(body) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.put(apiUrl + 'consultant-individual-profile/profile-info', body, options).pipe(
      catchError(this.handleError)
    );
  }

  // about me

  getAboutMe() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'consultant-individual-profile/about-me', options).pipe(
      catchError(this.handleError)
    );
  }

  putAboutMe(body) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.put(apiUrl + 'consultant-individual-profile/about-me', body, options).pipe(
      catchError(this.handleError)
    );
  }

  // work exp

  getWorkExp() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'consultant-individual-profile/work-experience', options).pipe(
      catchError(this.handleError)
    );
  }

  putWorkExp(body) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.put(apiUrl + 'consultant-individual-profile/work-experience', body, options).pipe(
      catchError(this.handleError)
    );
  }

  deleteWorkExperience(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers: headers };
    return this.http.delete(apiUrl + 'consultant-individual-profile/work-experience/?workExperienceId=' + id,
      options).pipe(
      catchError(this.handleError)
    );
  }

  // education

  getEduCert() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'consultant-individual-profile/education-certification', options).pipe(
      catchError(this.handleError)
    );
  }

  putEduCert(body) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.put(apiUrl + 'consultant-individual-profile/education-certification', body, options).pipe(
      catchError(this.handleError)
    );
  }

  deleteEduCert(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers: headers };
    return this.http.delete(apiUrl + 'consultant-individual-profile/education-certification/?id=' + id, options).pipe(
      catchError(this.handleError)
    );
  }

  // categories and skills common

  getListOfCategories(searchWord) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'list/category?where[search]=' + searchWord + '&where[limit]=50' , options).pipe(
      catchError(this.handleError)
    );
  }

  getListOfSubCategories(categories) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    let queryparams = '';

    categories.forEach((element,index) => {
      queryparams = queryparams + '&where[categoryIds][' + index + '][categoryId]=' + element.categoryId;
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'list/subcategory?where[limit]=50' + queryparams, options).pipe(
      catchError(this.handleError)
    );
  }

  getListOfSkills(categories,subcategories): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    let queryparams = '';

    categories.forEach((element,index) => {
      queryparams = queryparams + '&where[categoryIds][' + index + '][categoryId]=' + element.categoryId;
    });

    subcategories.forEach((element,index) => {
      queryparams = queryparams + '&where[subCategoryIds][' + index + '][subCategoryId]=' + element.subCategoryId;
    });

    const options = { headers: headers };
    return this.http.get<any>(apiUrl + 'list/skills/?where[search]=' + queryparams, options).pipe(
      catchError(this.handleError)
    );
  }

   // categories and skill selected

   getListOfSelectedCategoriesAndSkills() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'consultant-individual-profile/category-skills', options).pipe(
      catchError(this.handleError)
    );
  }

  putListOfSelectedCategoriesAndSkills(body) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.put(apiUrl + 'consultant-individual-profile/category-skills', body, options).pipe(
      catchError(this.handleError)
    );
  }

  // project and services
  getAllProjectServices() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'consultant-individual-profile/project-service-list', options).pipe(
      catchError(this.handleError)
    );
  }

  getProjectServicesDataById(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'consultant-individual-profile/project-service?where[projectAndServiceId]=' + id,
      options).pipe(catchError(this.handleError));
  }

  putProjectServices(body) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.put(apiUrl + 'consultant-individual-profile/project-service', body, options).pipe(
      catchError(this.handleError)
    );
  }

  postUploadProjectAttachment(body) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.post(apiUrl + 'consultant-individual-profile/project-service-upload', body, options).pipe(
      catchError(this.handleError)
    );
  }

  deleteProjectServices(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers: headers };
    return this.http.delete(apiUrl + 'consultant-individual-profile/project-service?where[projectAndServiceId]=' + id, options).pipe(
      catchError(this.handleError)
    );
  }

  // intro video

  getIntroVideo() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'consultant-individual-profile/intro-video',
      options).pipe(catchError(this.handleError));
  }

  postIntroVideo(body) {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authToken,
    'Access-Control-Allow-Origin': '*',
  });

  const options = { headers: headers };
  return this.http.post(apiUrl + 'consultant-individual-profile/upload-intro-video', body, options).pipe(
    catchError(this.handleError)
  );
}

  // location
  getListOfLocation(searchWord) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'list/location?where[query]=' + searchWord, options).pipe(
      catchError(this.handleError)
    );
  }


  // university
  getListOfUniversity(searchWord) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'list/universities?where[limit]=&where[query]=' + searchWord, options).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // get list of categories w/o search
  getCategories() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers: headers };
    return this.http.get(apiUrl + 'list/category?where[search]=&where[limit]=50' , options).pipe(
      catchError(this.handleError)
    );
  }

}
