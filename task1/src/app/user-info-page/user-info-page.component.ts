import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/User';
import { HttpRequestService } from '../services/http-request.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  isLoggedIn = false;

  data:object;

  userId:number;

  userChangeForm: FormGroup;
  submitted = false;

  constructor(private Auth: AuthServiceService, private httpReq:HttpRequestService, private router: Router, private headerService: HeaderService) { }

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

    this.httpReq.getAllUsers()
    .then(res => {
      for(let i =0; i<res.data.length; i++){
        console.log(res.data[i].id);
        if(res.data[i].email == localStorage.getItem('userEmail')) this.userId = res.data[i].id;
        console.log(this.userId);
        break;
      }
    })
    
  }

  get f() { return this.userChangeForm.controls; }

  async changeUser() {

    debugger;

    this.submitted = true;

    this.data = { image: this.userChangeForm.value.image, firstName: this.userChangeForm.value.firstName, lastName: this.userChangeForm.value.lastName, id: this.userId}
    
    await this.httpReq.changeUserInfo(this.data)
    .then(res => {
      localStorage.setItem('userFirstName', res.data.firstName);
      localStorage.setItem('userLastName', res.data.lastName);
    })
  }

}
