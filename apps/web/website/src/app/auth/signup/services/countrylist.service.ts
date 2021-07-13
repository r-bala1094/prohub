import { of } from 'rxjs/internal/observable/of';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, observeOn } from 'rxjs/operators';

@Injectable()
export class CountryList {

    hostUrl = "http://52.62.11.193:5000/api";

    constructor (private http: HttpClient) {}

    public countryList() {
        return this.http.get( this.hostUrl + '/list/country?where[name]=&where[limit]=10&where[code]')
    }
}
