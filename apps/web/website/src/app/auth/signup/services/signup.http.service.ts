
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/userDetail.model'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { delay } from 'rxjs/internal/operators';

@Injectable()
export class SignupHttpService {
  hostUrl = "http://52.62.11.193:5000/api";
  data: any[] = []

  constructor(private http: HttpClient) {}

  // public signup(payloadObject: any): Observable<any> {
  //   return of(payloadObject)
  // }

  public signup(user: User): Observable<User> {
    return this.http.post<User>( this.hostUrl + '/auth/signup', user)
  }

}
