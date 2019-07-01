import { Component, OnInit, Inject } from '@angular/core';
import { HttpRequestService } from '../services/http-request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CreateNewItemModalComponent } from '../create-new-item-modal/create-new-item-modal.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TableUpdateService } from '../services/update-table.service';
import { ArrayType } from '@angular/compiler';
import { User } from '../models/User';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  editUserForm: FormGroup;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  constructor(
    private matDialogRef: MatDialogRef<CreateNewItemModalComponent>,
    private updateTable: TableUpdateService,
    private imageCompress: NgxImageCompressService,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private httpReq: HttpRequestService) { }

  ngOnInit() {
    this.editUserForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      image: new FormControl(this.user.image),
      _id: new FormControl(this.user._id),
      email: new FormControl(this.user.email),
      unhashedPass: new FormControl(this.user.password)
    })
  }

  public closeModal() {
    this.matDialogRef.close();
  }

  async editUser(user) {
    console.log(user.value)
    this.httpReq.changeUserInfo(user.value).subscribe(res => {
      this.httpReq.getAllUsers().subscribe((res:any) => {
        console.log(res);
        
        let dataSource = res.data;
        this.updateTable.announcedUsersTableUpdate(dataSource);
      })
      this.matDialogRef.close();
    })
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        });
    });
  }

}
