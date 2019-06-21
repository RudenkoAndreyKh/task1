import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UserInfoService } from './services/user-info-service.service';
import { User } from './models/User';
import { AuthServiceService } from './services/auth-service.service';
import { HeaderService } from './services/header-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'Main Page';
  isLoggedIn = false;
  constructor(private userInfoService: UserInfoService, private headerService: HeaderService, private Auth: AuthServiceService) {


  }
  ngOnInit() {
    this.headerService.isUserLoggedInAnnounced$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngAfterContentChecked(){
    let user = <User>{ firstName: localStorage.getItem("userFirstName"), image: localStorage.getItem("userAvatar") };
    this.userInfoService.announcedUserInfo(user);
  }
}
