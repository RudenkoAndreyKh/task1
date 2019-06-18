import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpRequestService } from '../services/http-request.service';

@Component({
  selector: 'app-create-new-item-modal',
  templateUrl: './create-new-item-modal.component.html',
  styleUrls: ['./create-new-item-modal.component.css']
})
export class CreateNewItemModalComponent implements OnInit {

  addItemForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<CreateNewItemModalComponent>, @Inject(MAT_DIALOG_DATA) public item: any, private httpReq: HttpRequestService) { }

  

  ngOnInit() {
    this.addItemForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl('')
    })
  }

  public closeModal(){
    this.matDialogRef.close();
  }

  public add(item){
    console.log(item);
    this.httpReq.addItem(item);
    this.matDialogRef.close();
  }

}
