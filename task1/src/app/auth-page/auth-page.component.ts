import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service'
import { User } from '../models/User';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  title = 'authService Page';
  registerForm: FormGroup;
  submitted = false;
  isLoggedIn = false;
  public userModel: User;

  constructor(private router: Router, private authService: AuthServiceService) {
  }

  async ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get chekInputs() { return this.registerForm.controls; }

  addNewUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log("error")
      return;
    }
    this.authService.addNewUser(<User>{ 
      email: this.registerForm.value.email, 
      firstName: this.registerForm.value.firstName, 
      lastName: this.registerForm.value.lastName, 
      password: this.registerForm.value.password, 
      image: environment.defaultImage })
      .then(res =>{
        if(res.status == 201){
          this.router.navigate(['login']);
          return;
        }
        console.log("error respounse")
      })
  }

}

