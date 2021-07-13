import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

  authToken: string;
  constructor(
    public http: HttpClient
  ) {
    this.authToken = localStorage.getItem('token');
  }

  login() {

    const body = {
      "email" :"vairav.Lakshmanan@gmail.com",
      "password": "vairav.1234@",
      "accountType" : "CLIENT"
  }
    return this.http.post(apiUrl + 'auth/login', body, {})
  }

  setToken(token) {
    this.authToken = token;
    localStorage.setItem('token', token);
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

  setContentTypeHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });
  }

  setHeader() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });
  }

  getProfileInfo() {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(apiUrl + 'client-profile/profile-information', options).pipe(
      catchError(this.handleError)
    );
  }

  putProfileInfo(body) {
    const options = { headers: this.setHeader() };
    return this.http.put(apiUrl + 'client-profile/profile-information', body, options).pipe(
      catchError(this.handleError)
    );
  }

  postProfileInfo(body) {
    const options = { headers: this.setHeader() };
    return this.http.post(apiUrl + 'client-profile/profile-information', body, options).pipe(
      catchError(this.handleError)
    );
  }

  getLocation() {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(apiUrl + 'client-profile/location', options).pipe(
      catchError(this.handleError)
    );
  }

  putLocation(body) {
    const options = { headers: this.setHeader() };
    return this.http.put(apiUrl + 'client-profile/location', body, options).pipe(
      catchError(this.handleError)
    );
  }

  postLocation(body) {
    const options = { headers: this.setHeader() };
    return this.http.post(apiUrl + 'client-profile/location', body, options).pipe(
      catchError(this.handleError)
    );
  }

  getObjectivesAndServices() {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(apiUrl + 'client-profile/objectives-services', options).pipe(
      catchError(this.handleError)
    );
  }

  putObjectives(body) {
    const options = { headers: this.setHeader() };
    return this.http.put(apiUrl + 'client-profile/objective', body, options).pipe(
      catchError(this.handleError)
    );
  }

  putServices(body) {
    const options = { headers: this.setHeader() };
    return this.http.put(apiUrl + 'client-profile/services', body, options).pipe(
      catchError(this.handleError)
    );
  }

  postObjectives(body) {
    const options = { headers: this.setHeader() };
    return this.http.post(apiUrl + 'client-profile/objective', body, options).pipe(
      catchError(this.handleError)
    );
  }

  postServices(body) {
    const options = { headers: this.setHeader() };
    return this.http.post(apiUrl + 'client-profile/services', body, options).pipe(
      catchError(this.handleError)
    );
  }

  getCompanyInfo() {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(apiUrl + 'client-profile/company-info', options).pipe(
      catchError(this.handleError)
    );
  }

  putCompanyInfo() {
    const options = { headers: this.setHeader() };
    return this.http.put(apiUrl + 'client-profile/company-info', options).pipe(
      catchError(this.handleError)
    );
  }

  postCompanyInfo() {
    const options = { headers: this.setHeader() };
    return this.http.post(apiUrl + 'client-profile/company-info', options).pipe(
      catchError(this.handleError)
    );
  }

  getBusinessInfo() {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(apiUrl + 'client-profile/business-info', options).pipe(
      catchError(this.handleError)
    );
  }

  putBusinessInfo() {
    const options = { headers: this.setHeader() };
    return this.http.put(apiUrl + 'client-profile/business-info', options).pipe(
      catchError(this.handleError)
    );
  }

  postBusinessInfo() {
    const options = { headers: this.setHeader() };
    return this.http.post(apiUrl + 'client-profile/business-info', options).pipe(
      catchError(this.handleError)
    );
  }

  getGovtInfo() {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(apiUrl + 'client-profile/government-info', options).pipe(
      catchError(this.handleError)
    );
  }

  putGovtInfo() {
    const options = { headers: this.setHeader() };
    return this.http.put(apiUrl + 'client-profile/government-info', options).pipe(
      catchError(this.handleError)
    );
  }

  postGovtInfo() {
    const options = { headers: this.setHeader() };
    return this.http.post(apiUrl + 'client-profile/government-info', options).pipe(
      catchError(this.handleError)
    );
  }

}
