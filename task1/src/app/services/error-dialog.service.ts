import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorDialogComponent } from '../interceptors/error-dialog.component';

@Injectable()
export class ErrorDialogService {

    constructor(public dialog: MatDialog) { }
    openDialog(data): void {
        console.log("errData",data);
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }
}