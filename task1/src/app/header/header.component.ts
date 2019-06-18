import { Component, OnInit, Injectable } from '@angular/core';
import { UserInfoService } from '../services/user-info-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  userFirstName = "";
  Auth: AuthServiceService;

  constructor(private router: Router, private userInfo: UserInfoService, private headerService: HeaderService) {
    this.Auth = new AuthServiceService();
  }


  logout() {
    this.Auth.logout();
    this.headerService.announcedisUserLoggedIn(false);
    return this.router.navigate(['login']);
  }

  // firstName = [];



  ngOnInit() {
    this.userInfo.userInfoAnnounced$.subscribe(
      (user: User) => {
        this.userFirstName = user.email;
      });
  }

}
