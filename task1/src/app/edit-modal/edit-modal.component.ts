import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpRequestService } from '../services/http-request.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TableUpdateService } from '../services/update-table.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  editItemForm: FormGroup;

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  constructor(private matDialogRef: MatDialogRef<EditModalComponent>, private imageCompress: NgxImageCompressService, private updateTable: TableUpdateService, @Inject(MAT_DIALOG_DATA) public item: any, private httpReq: HttpRequestService) { }



  ngOnInit() {
    this.editItemForm = new FormGroup({
      name: new FormControl(this.item.name),
      description: new FormControl(this.item.description),
      image: new FormControl(this.item.image),
      price: new FormControl(this.item.price)
    })
  }

  public closeModal() {
    this.matDialogRef.close();
  }

  public async editItem(item, id) {
    this.editItemForm.value.image = this.imgResultAfterCompress;
    var result = await this.httpReq.editItem(item, id);
    if (result.status === 200) {
      let dataSource: any = await <any>this.httpReq.getAllGames();
      debugger;
      this.updateTable.announcedTableUpdate(dataSource.data);
      this.matDialogRef.close();
    }

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
