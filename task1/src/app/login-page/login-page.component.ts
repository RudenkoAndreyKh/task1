import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';
import { AdminCheck } from '../services/admin-check.service';

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
  isNotLoggedInUser = false;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private authService: AuthServiceService,
    private adminCheck: AdminCheck) {
    this.headerService.announcedisNotLoggedInUser(this.isNotLoggedInUser);
  }

  async ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    let userModel = JSON.parse(localStorage.getItem("userModel"));
    let accessToken = localStorage.getItem('accessToken');
    if (userModel) {
      await this.authService.isLoggedIn(userModel, accessToken).subscribe((res:any) => {
        this.isLoggedIn = res.success;
      })
      if (this.isLoggedIn) {
        this.router.navigate(['']);
      }
    }
  }

  login() {
    let userModel = <User>({ email: this.loginForm.value.email, password: this.loginForm.value.password })
    this.authService.login(userModel)
      .subscribe((res: any) => {
        console.log(res);
        
        if (res.data.user.success === true) this.headerService.announcedisUserLoggedIn(true);
        if (res.data.user.status === 'admin') this.adminCheck.announcedisUserLoggedInAsAdmin(true);
        this.router.navigate([''])
          .then(() => {
            let userModel = { email: res.data.user.email, firstName: res.data.user.firstName, lastName: res.data.user.lastName, image: res.data.user.image, status: res.data.user.status };
            localStorage.setItem('userModel', JSON.stringify(userModel));
            localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
            localStorage.setItem('tokenExpiresIn', JSON.stringify(res.data.tokenExpiresIn));
          });

      })
  }

}
