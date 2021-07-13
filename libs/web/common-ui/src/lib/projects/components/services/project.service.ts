import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

const  apiUrl = "http://52.62.11.193:5000/api";

@Injectable()
export class ProjectService {

    authToken: string | null;
    constructor(private http: HttpClient) {
        this.authToken = localStorage.getItem('token');
    }

    getProjects() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authToken,
            'Access-Control-Allow-Origin': '*',
          });
      
        const options = { headers: headers };      
        return this.http.get(apiUrl + '/create-project/created-project', options).pipe(
            catchError(this.handleError)
        )
    }

    handleError(error: any) {
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


}

