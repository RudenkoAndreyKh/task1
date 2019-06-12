import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  Auth: AuthServiceService;
  registerForm: FormGroup;
  submitted = false;
  constructor() {
    this.Auth = new AuthServiceService();
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get f() { return this.registerForm.controls; }

  title = 'Auth Page';

  addNewUser() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log("shiii")
      return;
    }

    return this.Auth.addNewUser(this.registerForm.value, this.registerForm.value.lastName, this.registerForm.value.email, this.password);
  }

}
