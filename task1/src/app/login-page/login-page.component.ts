import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { UserInfoService } from '../services/user-info-service.service';
import { HeaderService } from '../services/header-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
  
})
export class LoginPageComponent implements OnInit {
  title = "Login page"
  public userModel: User;
  loginForm: FormGroup;
  submitted = false;
  isLoggedIn = false;

  constructor(private router: Router, private userInfoService :UserInfoService, private headerService: HeaderService, private Auth: AuthServiceService) {
  }

  async ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    await this.Auth.isLoggedIn().then(res => {
      this.isLoggedIn = res;
    })
    if (this.isLoggedIn) {
      this.router.navigate(['']);
    }
  }

  async login() {
    await this.Auth.login()
    .then(res => {
      let data = res;
      data.data.filter(user => {
        console.log(user.email, this.loginForm.controls.email.value);
        console.log(user.password, this.loginForm.controls.password.value)
        if (user.email == this.loginForm.controls.email.value && user.password == this.loginForm.controls.password.value) {
          this.isLoggedIn = true;
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userFirstName", user.firstName);
          localStorage.setItem("userLastName", user.lastName);
          localStorage.setItem("userAvatar", user.image);
          this.router.navigate(['']);
          return;
        };
      })
    })
    
    
  }

}
