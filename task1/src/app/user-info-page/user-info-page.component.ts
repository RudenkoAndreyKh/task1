import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRequestService } from '../services/http-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxImageCompressService } from 'ngx-image-compress';
import { User } from '../models/User';

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
  public imagePath;
  imgPath: any;
  public imageError: string;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string = localStorage.userAvatar;

  constructor(
    private authService: AuthServiceService,
    private imageCompress: NgxImageCompressService,
    private httpReq: HttpRequestService,
    private router: Router,
    private headerService: HeaderService,
    private _snackBar: MatSnackBar) {

  }

  async ngOnInit() {
    this.userChangeForm = new FormGroup({
      firstName: new FormControl(localStorage.userFirstName, Validators.required),
      lastName: new FormControl(localStorage.userLastName, Validators.required),
      image: new FormControl(localStorage.userAvatar)
    })

    await this.authService.isLoggedIn().subscribe((res: User[]) => {
      let isLoggedIn: boolean = false;
      let userModel = JSON.parse(localStorage.getItem("userModel"));
      let data = res;
      if (userModel !== null) {
        let userEmail = userModel.userEmail;
        data.filter(user => {
          if (user.email == userEmail) {
            isLoggedIn = true;
          }
        })

      }
      this.isLoggedIn = isLoggedIn;

      if (!this.isLoggedIn) {
        this.router.navigate(['login']).then(() => {
          this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
        });
      }
      this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
    })

    this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
    this.httpReq.getAllUsers()
      .subscribe((res: User[]) => {
        res.map((user) => {
          let userModel = JSON.parse(localStorage.getItem('userModel'));
          if (user.email == userModel.userEmail) {
            this.data = user;
            return;
          };
        })
      })
  }

  get checkInputs() { return this.userChangeForm.controls; }

  async changeUser() {
    this.submitted = true;
    if (!this.userChangeForm.invalid) {
      this.data.firstName = this.userChangeForm.value.firstName;
      this.data.lastName = this.userChangeForm.value.lastName;
      if (this.imgResultAfterCompress == undefined) this.data.image = this.data.image;
      else this.data.image = this.imgResultAfterCompress;
      await this.httpReq.changeUserInfo(this.data)
        .subscribe((res: User) => {
          let userModel = JSON.parse(localStorage.getItem('userModel'));
          userModel.userFirstName = res.firstName;
          userModel.userLastName = res.lastName;
          userModel.userAvatar = this.imgResultAfterCompress;
          localStorage.setItem('userModel', JSON.stringify(userModel));
          this._snackBar.open('Your info updated', '', { duration: 2000 });
        })
    }
    return;
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
    });
  }
}