import { Component, OnInit, Injectable } from '@angular/core';
import { UserInfoService } from '../services/user-info-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
 
})
export class HeaderComponent implements OnInit {
  userFirstName = "";//localStorage.getItem("userFirstName");
  Auth: AuthServiceService;
  // constructor() {
  //   this.Auth = new AuthServiceService();
  // }

  
  logout() {
    return this.Auth.logout();
  }

    // firstName = [];

  constructor(private userInfo: UserInfoService) { 
   alert('ctr');
  }

  ngOnInit() {
    this.userInfo.userInfoAnnounced$.subscribe(
      (user : User) => {
        this.userFirstName = user.email;
        
      });
  }

}
