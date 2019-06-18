import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {

  isLoggedIn = false;
  constructor(private router: Router, private headerService: HeaderService, private Auth: AuthServiceService) {

  }

  async ngOnInit() {
    await this.Auth.isLoggedIn().then(res => {
      this.isLoggedIn = res;
    })
    if (!this.isLoggedIn) {
      this.router.navigate(['login']).then(() => {
        this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
      });
    }
    this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
  }

}
