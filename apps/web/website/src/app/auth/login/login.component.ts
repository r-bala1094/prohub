import { LoginService } from './../login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'prohub-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router:Router,
    private loginFb: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.loginFb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      accountType: ['CONSULTANT'],
    })
  }

  login() {
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value)
    .subscribe((response:any) => {
      console.log('login', response)
      localStorage.setItem('UserAuthToken', response.response.data.token)
    })
  }

  navigateTo(pageType: string) {
    this.router.navigate([pageType]);
  }
  
  hide=true;

}
