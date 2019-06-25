import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpRequestService } from '../services/http-request.service';
import { TableUpdateService } from '../services/update-table.service';
import { ItemsDataTableItem } from '../items-data-table/items-data-table-datasource';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Item } from '../models/Item';

@Component({
  selector: 'app-create-new-item-modal',
  templateUrl: './create-new-item-modal.component.html',
  styleUrls: ['./create-new-item-modal.component.css']
})
export class CreateNewItemModalComponent implements OnInit {
  addItemForm: FormGroup;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  constructor(
    private matDialogRef: MatDialogRef<CreateNewItemModalComponent>,
    private imageCompress: NgxImageCompressService,
    @Inject(MAT_DIALOG_DATA) public item: any,
    private httpReq: HttpRequestService,
    private updateTable: TableUpdateService) { }

  ngOnInit() {
    this.addItemForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl('')
    })
  }

  public closeModal() {
    this.matDialogRef.close();
  }

  public async addItem(newItem) {
    this.addItemForm.value.image = this.imgResultAfterCompress;
    let item: Item = <Item>{name: newItem.value.name, description: newItem.value.description, price: newItem.value.price, image: newItem.value.image};
    var result = await this.httpReq.addItem(item);
    if (result.status === 201) {
      let dataSource: any = await <any>this.httpReq.getAllGames();
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
        });
    });
  }

}
