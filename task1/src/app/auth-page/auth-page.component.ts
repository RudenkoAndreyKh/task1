import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  Auth: AuthServiceService;
  constructor() {
    this.Auth = new AuthServiceService();
  }
  title = 'Auth Page';

  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');

  addNewUser() {
    this.Auth.addNewUser(this.firstName, this.lastName, this.email, this.password);
  }

}
