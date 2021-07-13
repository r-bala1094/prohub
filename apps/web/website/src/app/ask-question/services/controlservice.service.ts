import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl: string = "http://52.62.11.193:5000/api";

@Injectable({
  providedIn: 'root'
})
export class ControlserviceService {

  constructor(private http: HttpClient) { }

  addquestion(data: any) {
    return data;
  }



}

