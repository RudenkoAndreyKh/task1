import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/User';
import { HttpRequestService } from '../services/http-request.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  isLoggedIn = false;

  data;

  userId: number;

  userChangeForm: FormGroup;
  submitted = false;

  constructor(private Auth: AuthServiceService, private httpReq: HttpRequestService, private router: Router, private headerService: HeaderService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.userChangeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      image: new FormControl('')
    })

    await this.Auth.isLoggedIn().then(res => {
      this.isLoggedIn = res;
    })
    if (!this.isLoggedIn) {
      this.router.navigate(['login']).then(() => {
        this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
      });
    }
    this.headerService.announcedisUserLoggedIn(this.isLoggedIn);

    await this.httpReq.getAllUsers()
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i].id);
          if (res.data[i].email == localStorage.getItem('userEmail')) this.data = res.data[i];
          console.log(this.data);
          break;
        }
      })
  }

  get f() { return this.userChangeForm.controls; }

  async changeUser() {

    this.submitted = true;

    if (!this.userChangeForm.invalid) {
      this.data.firstName = this.userChangeForm.value.firstName;
      this.data.lastName = this.userChangeForm.value.lastName;
      if (this.userChangeForm.value.image != '') this.data.image = this.userChangeForm.value.image;
      console.log(this.data);
      await this.httpReq.changeUserInfo(this.data)
        .then(res => {
          localStorage.setItem('userFirstName', res.data.firstName);
          localStorage.setItem('userLastName', res.data.lastName);
          localStorage.setItem('userAvatar', res.data.image);
          this._snackBar.open('Your info updated', '' ,{duration: 2000});
        })
    }
    return;
  }

}
