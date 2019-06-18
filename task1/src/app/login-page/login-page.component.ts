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
  Auth: AuthServiceService;
  public userModel: User;
  loginForm: FormGroup;
  submitted = false;
  isLoggedIn = false;

  constructor(private router: Router, private userInfoService :UserInfoService, private headerService: HeaderService) {
    this.Auth = new AuthServiceService();
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
    await this.Auth.login(<User>{ email: this.loginForm.value.email, password: this.loginForm.value.password })
    .then(res => {
      this.isLoggedIn = res;

      if (this.isLoggedIn) {
        let user = <User>{ email: this.loginForm.value.email, password: this.loginForm.value.password };
       
        this.router.navigate(['']).then(() => {
          this.userInfoService.announcedUserInfo(user);
          this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
        })
       
      };
    });
    
    
  }

}
