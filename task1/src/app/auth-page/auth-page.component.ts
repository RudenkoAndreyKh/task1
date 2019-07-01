import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service'
import { User } from '../models/User';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HeaderService } from '../services/header-service';

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

  constructor(private router: Router, private authService: AuthServiceService, private headerService: HeaderService) {
  }

  async ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    let userModel = JSON.parse(localStorage.getItem("userModel"));
    if (userModel) {
      await this.authService.isLoggedIn(userModel).subscribe((res:any) => {
        console.log(res);
        
        this.isLoggedIn = res.success;
      })
    }
    this.headerService.announcedisNotLoggedInUser(this.isLoggedIn);
  }

  get chekInputs() { return this.registerForm.controls; }

  addNewUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log("error")
      return;
    }
    this.authService.addNewUser(<User>{
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      image: environment.defaultImage
    })
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['login']);
        return;
      })
  }

}

