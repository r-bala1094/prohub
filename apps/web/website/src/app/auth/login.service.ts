import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  apiUrl = "http://52.62.11.193:5000/api";

  constructor( private http: HttpClient) { }
  
  login(data:any) {
    return this.http.post(this.apiUrl + '/auth/login', data)
  }

  isLoggedIn() {
    if (localStorage.getItem('UserAuthToken')) {
      return true;
    }
    return false;
  }
}
