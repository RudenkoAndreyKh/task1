import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  Auth:AuthServiceService;
  isLoggedIn = false;
  constructor(private router:Router) {
    this.Auth = new AuthServiceService();
  }

  async ngOnInit() {
    await this.Auth.isLoggedIn().then(res => {
      this.isLoggedIn = res;
    })
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
    }
  }

}
