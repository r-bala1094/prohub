import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class WebCommonService {
  authToken: string;

  constructor(
    public http: HttpClient
  ) {
    this.authToken = localStorage.getItem('token');
  }

  setContentTypeHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken,
      'Access-Control-Allow-Origin': '*',
    });
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

  getTimeZonesList(timezone, limit, countryCode) {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(`${apiUrl}list/timezone?where[TimeZone]=${timezone}&where[limit]=${limit}&where[CountryCode]=${countryCode}`, options).pipe(
      catchError(this.handleError)
    );
  }

  getCountriesList(name, limit, code) {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(`${apiUrl}list/country?where[name]=${name}&where[limit]=${limit}&where[code]=${code}`, options).pipe(
      catchError(this.handleError)
    );
  }

  getStatesList(name, limit, code) {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(`${apiUrl}list/state?where[Subdivision_Name]=${name}&where[limit]=${limit}&where[Country_Code]=${code}`, options).pipe(
      catchError(this.handleError)
    );
  }

  getCategoriesList(search, limit) {
    const options = { headers: this.setContentTypeHeader() };
    return this.http.get(`${apiUrl}list/category?where[search]=${search}&where[limit]=${limit}`, options).pipe(
      catchError(this.handleError)
    );
  }

  getSubCategoriesList(categoryIds, limit) {
    const options = { headers: this.setContentTypeHeader() };
    let queryParams = `where[limit]=${limit}`;
    categoryIds.forEach((id, index) => {
      queryParams += `&where[categoryIds][${index}][categoryId]=${id}`;
    });
    return this.http.get(`${apiUrl}list/subcategory?${queryParams}`, options).pipe(
      catchError(this.handleError)
    );
  }

  getSkillsList(categoryIds, subcategoryIds, search, limit) {
    const options = { headers: this.setContentTypeHeader() };
    let queryParams = `where[limit]=${limit}`;
    categoryIds.forEach((id, index) => {
      queryParams += `&where[categoryIds][${index}][categoryId]=${id}`;
    });
    subcategoryIds.forEach((id, index) => {
      queryParams += `&where[subCategoryIds][${index}][subCategoryId]=${id}`;
    });
    queryParams += `&where[search]=${search}`;
    return this.http.get(`${apiUrl}list/skills?${queryParams}`, options).pipe(
      catchError(this.handleError)
    );
  }
}
