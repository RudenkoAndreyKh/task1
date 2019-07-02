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
  imgResultAfterCompress: string = localStorage.image;

  constructor(
    private authService: AuthServiceService,
    private imageCompress: NgxImageCompressService,
    private httpReq: HttpRequestService,
    private router: Router,
    private headerService: HeaderService,
    private _snackBar: MatSnackBar) {

  }

  async ngOnInit() {
    let userModel = JSON.parse(localStorage.getItem("userModel"));
    let accessToken = localStorage.getItem('accessToken');
    this.userChangeForm = new FormGroup({
      email: new FormControl(userModel.email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl(userModel.firstName),
      lastName: new FormControl(userModel.lastName),
      image: new FormControl(userModel.image)
    })


    if (userModel) {
      await this.authService.isLoggedIn(userModel, accessToken).subscribe((res: any) => {
        this.isLoggedIn = res.success;
        this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
      })
    }

    this.headerService.announcedisUserLoggedIn(this.isLoggedIn);

    this.httpReq.getUser(userModel.email)
      .subscribe((res: any) => {
        this.data = res.data;
      })
  }

  get checkInputs() { return this.userChangeForm.controls; }

  async changeUser() {
    this.submitted = true;
    console.log(this.userChangeForm);
    if (!this.userChangeForm.invalid) {
      this.userChangeForm.value.image = this.imgResultAfterCompress;
      let userModel = { firstName: this.userChangeForm.value.firstName, lastName: this.userChangeForm.value.lastName, email: this.userChangeForm.value.email, unhashedPass: this.userChangeForm.value.password, image: this.userChangeForm.value.image, _id: this.data._id }

      await this.httpReq.changeUserInfo(userModel).subscribe((res:any) => {

          console.log(res);
          localStorage.setItem('userModel', JSON.stringify(res.data));
          this._snackBar.open('Your info updated', '', { duration: 2000 });

      })

      // await this.httpReq.changeUserInfo(userModel)
      //   .subscribe(res => {
      //     console.log("before RESPONSE");
      //     console.log("RESPONSE", res);
      //     // let userModel = JSON.parse(localStorage.getItem('userModel'));
      //     // userModel.firstName = res.firstName;
      //     // userModel.lastName = res.lastName;
      //     // userModel.image = this.imgResultAfterCompress;
      //     // localStorage.setItem('userModel', JSON.stringify(userModel));
      //     this._snackBar.open('Your info updated', '', { duration: 2000 });
      //   })
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
