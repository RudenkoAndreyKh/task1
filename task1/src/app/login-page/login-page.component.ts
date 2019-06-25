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

    await this.authService.isLoggedIn().subscribe((res: User[]) => {
      let isLoggedIn: boolean = false;
      let userModel = JSON.parse(localStorage.getItem("userModel"));
      let data = res;
      if (userModel !== null) {
        let userEmail = userModel.userEmail;
        data.filter(user => {
          if (user.email == userEmail) {
            isLoggedIn = true;
          }
        })
      }
      this.isLoggedIn = isLoggedIn;
    })
    if (this.isLoggedIn) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.authService.login()
      .subscribe((res: User[]) => {
        let data = res;
        data.map((user:any) => {
          if (user.email == this.loginForm.controls.email.value && user.password == this.loginForm.controls.password.value) {
            if (user.status != undefined) this.headerService.announcedisNotLoggedInUser(true);
            this.headerService.announcedisNotLoggedInUser(!this.isNotLoggedInUser);
            this.isLoggedIn = true;
            let userModel = { userEmail: user.email, userFirstName: user.firstName, userLastName: user.lastName, userAvatar: user.image, userStatus: user.status };
            localStorage.setItem('userModel', JSON.stringify(userModel));
            if (localStorage.userModel.userStatus === 'admin') this.adminCheck.announcedisUserLoggedInAsAdmin(true);
            this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
            this.router.navigate(['']);
            return;
          };
        })
      })
  }

}
