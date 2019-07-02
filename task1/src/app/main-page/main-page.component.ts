import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { HeaderService } from '../services/header-service';
import { User } from '../models/User';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  isLoggedIn = false;
  isNotLoggedInUser = true;

  constructor(
    private headerService: HeaderService,
    private authService: AuthServiceService) {
    this.headerService.announcedisNotLoggedInUser(this.isNotLoggedInUser);
  }

  async ngOnInit() {
    let accessToken = localStorage.getItem('accessToken');
    let userModel = JSON.parse(localStorage.getItem("userModel"));
    if (userModel) {
      await this.authService.isLoggedIn(userModel, accessToken).subscribe((res:any) => {
        console.log(res);
        this.isLoggedIn = res.success;
        this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
      })
    }
  }

}
