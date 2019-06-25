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
      this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
    })

  }

}
