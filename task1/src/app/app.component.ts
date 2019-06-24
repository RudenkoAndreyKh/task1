import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UserInfoService } from './services/user-info-service.service';
import { User } from './models/User';
import { HeaderService } from './services/header-service';
import { AdminCheck } from './services/admin-check.service';
import { HttpRequestService } from './services/http-request.service';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'Main Page';
  isLoggedIn = false;
  isNotLoggedInUser = true;
  isAdmin = false;

  constructor(
    private userInfoService: UserInfoService,
    private httpReq: HttpRequestService,
    private adminCheck: AdminCheck,
    private headerService: HeaderService,
    private authService: AuthServiceService ) { }

  async ngOnInit() {
    this.headerService.isUserLoggedInAnnounced$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
    this.headerService.isNotLoggedInUserAnnounced$.subscribe(
      (isNotLoggedInUser) => {
        this.isNotLoggedInUser = isNotLoggedInUser;
      });
      await this.authService.isLoggedIn().then(res => {
        this.isLoggedIn = res;
      })
      this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
  }

  ngAfterContentChecked() {
    let user = <User>{ firstName: localStorage.getItem("userFirstName"), image: localStorage.getItem("userAvatar") };
    this.userInfoService.announcedUserInfo(user);
    if (localStorage.userStatus == 'admin') this.isAdmin = true;
    this.adminCheck.announcedisUserLoggedInAsAdmin(this.isAdmin)
  }
}
