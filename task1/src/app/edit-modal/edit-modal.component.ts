import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<EditModalComponent>, @Inject(MAT_DIALOG_DATA) public item: any) { }

  ngOnInit() {
    console.log("item",this.item);
  }

  public closeModal(){
    this.matDialogRef.close();
  }

}
