import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent {
  title = 'Interceptor Error';
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}