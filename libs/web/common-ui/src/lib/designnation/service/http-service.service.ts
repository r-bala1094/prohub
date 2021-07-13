import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpDeginationService {
  constructor(private http: HttpClient) {}
}
