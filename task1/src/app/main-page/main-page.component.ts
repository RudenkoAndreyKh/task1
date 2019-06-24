import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { HeaderService } from '../services/header-service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  isLoggedIn = true;
  isNotLoggedInUser = true;
  
  constructor(
    private headerService: HeaderService,
    private authService: AuthServiceService) {
    this.headerService.announcedisNotLoggedInUser(this.isNotLoggedInUser);
  }

  async ngOnInit() {
    await this.authService.isLoggedIn().then(res => {
      this.isLoggedIn = res;
    })
    this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
  }

}
