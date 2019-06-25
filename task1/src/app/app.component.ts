import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UserInfoService } from './services/user-info-service.service';
import { User } from './models/User';
import { HeaderService } from './services/header-service';
import { AdminCheck } from './services/admin-check.service';
import { HttpRequestService } from './services/http-request.service';
import { AuthServiceService } from './services/auth-service.service';
import { map } from 'rxjs/internal/operators/map';

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
    private authService: AuthServiceService) { }

  async ngOnInit() {
    this.headerService.isUserLoggedInAnnounced$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
    this.headerService.isNotLoggedInUserAnnounced$.subscribe(
      (isNotLoggedInUser) => {
        this.isNotLoggedInUser = isNotLoggedInUser;
      });
    await this.authService.isLoggedIn().subscribe((res: User[]) => {
      let isLoggedIn: boolean = false;
      let userModel = JSON.parse(localStorage.getItem("userModel"));
      let data = res;
      if (userModel !== null) {
        let userEmail = userModel.userEmail;
        data.filter(user => {
          if (user.email === userEmail) {
            isLoggedIn = true;
            this.headerService.announcedisUserLoggedIn(isLoggedIn);
          }
        })
      }
    })
  }

  ngAfterContentChecked() {
    let userModel = JSON.parse(localStorage.getItem("userModel"));
    if (userModel !== null) {
      if (userModel.userStatus == 'admin') this.isAdmin = true;
      let user = <User>{ firstName: userModel.userFirstName, image: userModel.userAvatar };
      this.userInfoService.announcedUserInfo(user);

      this.adminCheck.announcedisUserLoggedInAsAdmin(this.isAdmin)
    }

  }
}
