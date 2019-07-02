import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UserInfoService } from './services/user-info-service.service';
import { User } from './models/User';
import { HeaderService } from './services/header-service';
import { AdminCheck } from './services/admin-check.service';
import { HttpRequestService } from './services/http-request.service';
import { AuthServiceService } from './services/auth-service.service';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  isLoggedIn = false;
  isNotLoggedInUser = true;
  isAdmin = false;

  constructor(
    private userInfoService: UserInfoService,
    private httpReq: HttpRequestService,
    private adminCheck: AdminCheck,
    private headerService: HeaderService,
    private authService: AuthServiceService,
    private router: Router) { }

  async ngOnInit() {
    this.headerService.isUserLoggedInAnnounced$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
    this.headerService.isNotLoggedInUserAnnounced$.subscribe(
      (isNotLoggedInUser) => {
        this.isNotLoggedInUser = isNotLoggedInUser;
      });
    let accessToken = localStorage.getItem('accessToken');
    let tokenExpiresIn = localStorage.getItem("tokenExpiresIn");
    let userModel = JSON.parse(localStorage.getItem("userModel"));
    if (userModel) {
      await this.authService.isLoggedIn(userModel, accessToken).subscribe((res: any) => {
        this.isLoggedIn = res.success;
        this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
      })
      if (await this.authService.isTokenExpired(tokenExpiresIn)) {
        this.authService.logout();
        this.router.navigate(['login'])
      };
    }
    this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
  }

  ngAfterContentChecked() {
    let userModel = JSON.parse(localStorage.getItem("userModel"));
    if (userModel !== null) {
      if (userModel.status == 'admin') this.isAdmin = true;
      let user = <User>{ firstName: userModel.firstName, image: userModel.image };
      this.userInfoService.announcedUserInfo(user);

      this.adminCheck.announcedisUserLoggedInAsAdmin(this.isAdmin)
    }

  }
}
