import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpRequestService } from '../services/http-request.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  editItemForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<EditModalComponent>, @Inject(MAT_DIALOG_DATA) public item: any, private httpReq: HttpRequestService) { }

  

  ngOnInit() {
    this.editItemForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl('')
    })
  }

  public closeModal(){
    this.matDialogRef.close();
  }

  public edit(item, id){
    console.log(item);
    this.httpReq.editItem(item, id);
    this.matDialogRef.close();
  }

}
