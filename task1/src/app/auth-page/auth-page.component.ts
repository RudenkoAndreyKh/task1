import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service'
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  title = 'Auth Page';

  Auth: AuthServiceService;

  registerForm: FormGroup;
  submitted = false;

  isLoggedIn = false;

  public userModel: User;

  constructor(private router: Router) {
    this.Auth = new AuthServiceService();
  }

  async ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    await this.Auth.isLoggedIn().then(res => {
      this.isLoggedIn = res;
    })
    if (this.isLoggedIn) {
      this.router.navigate(['']);
    }
  }

  get f() { return this.registerForm.controls; }

  addNewUser() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    
    this.Auth.addNewUser(<User>{ email: this.registerForm.value.email, firstName: this.registerForm.value.firstName, lastName: this.registerForm.value.lastName, password: this.registerForm.value.password });
    this.router.navigate(['']);
  }

}

