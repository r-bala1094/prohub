import { passwordValidator } from './../services/common.validator';
import { of } from 'rxjs/internal/observable/of';

import { AccountTypeModule } from './../../../../../../../../libs/web/account-type/src/lib/account-type/account-type.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { SignupHttpService } from '../services/signup.http.service';
import { CountryList } from '../services/countrylist.service';
import { Route } from '@angular/router/';

@Component({
  templateUrl: 'signup.component.html',
  selector: 'prohub-signup',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent implements OnInit {

  hostUrl = "http://52.62.11.193:5000/api";
  listOfCountries = [];
  isSignup: boolean;
  accountType = "CONSULTANT";

  corporations: any[] = [
    {corporationType: "Individual", corporationTypeId: 1},
    {corporationType: "Business", corporationTypeId: 2},
    {corporationType: "Government", corporationTypeId: 3},
  ]

  public readonly signUp: FormGroup = new FormGroup({
    accountType: new FormControl(this.accountType),
    firstName: new FormControl("", [Validators.required] ), // validator goes here,
    lastName: new FormControl("", [Validators.required] ), // validator goes here
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ] ), // validator goes here
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      passwordValidator.cannotContainSpace,
    ] ), // validator goes here
    country: new FormControl("", [Validators.required] ), // validator goes here
    corporation: new FormControl("", [Validators.required] ), // validator goes here
    // additionalInformation: new FormGroup({
    sendMeUsefulInformation: new FormControl(), // validator goes here
    termsPrivacyServicePolicy: new FormControl("", [Validators.required] ), // validator goes here
    // }), // validator goes here
  });

  constructor(
    private signService: SignupHttpService,
    private countryList: CountryList,
    private router: Router,
    ) {}


  ngOnInit() {
    this.getCountryList()
  }

  get firstName() {
    return this.signUp.get('firstName');
  }

  get lastName() {
    return this.signUp.get('lastName');
  }

  get email() {
    return this.signUp.get('email');
  }

  get password() {
    return this.signUp.get('password');
  }


  onSignup() {
    // console.log('value', this.signUp.value)
    localStorage.removeItem('memberSignupCurrentTab');
    this.signService.signup(this.signUp.value)
    .subscribe(
      (response: any) => {
        console.log('apiresponse', response)
        localStorage.setItem('UserAuthToken', response.response.data.token)
        this.router.navigate(['/auth/signup/individualMemberSignup']);
        console.log('apiresponse', response)
    })
  }

  getCountryList() {
    let val: any = {}
    this.countryList.countryList()
    .subscribe(
      response => {
        val = response;
        this.listOfCountries.push(val.response.data)
        console.log('listofcountries', this.listOfCountries);
        val.status === true ? this.isSignup = true : this.isSignup = false; //check responsestatus
    })
  }

  hide=true;

}
