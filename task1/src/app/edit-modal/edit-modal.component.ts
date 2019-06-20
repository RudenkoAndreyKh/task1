import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpRequestService } from '../services/http-request.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TableUpdateService } from '../services/update-table.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  editItemForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<EditModalComponent>, private updateTable:TableUpdateService, @Inject(MAT_DIALOG_DATA) public item: any, private httpReq: HttpRequestService) { }



  ngOnInit() {
    this.editItemForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl('')
    })
  }

  public closeModal() {
    this.matDialogRef.close();
  }

  public async edit(item, id) {
    console.log(item);
    var result = await this.httpReq.editItem(item, id);
    console.log(result);
    if (result.status === 200) {
      let dataSource: any = await <any>this.httpReq.getAllGames();
      debugger;
      this.updateTable.announcedTableUpdate(dataSource.data);
      this.matDialogRef.close();
    }

  }

}
