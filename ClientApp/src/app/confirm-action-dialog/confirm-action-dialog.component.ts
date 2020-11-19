import { Component, Inject, OnInit, Optional } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-dialog',
  templateUrl: './confirm-action-dialog.component.html',
  styleUrls: ['./confirm-action-dialog.component.css']
})
export class ConfirmActionDialogComponent {

  event: boolean;
  action: any;

  constructor(
    public dialogRef: MatDialogRef<string>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string) {
    this.action = data;
  }

  doAction(): any {
    this.dialogRef.close({event: true});
  }

  closeDialog(): any {
    this.dialogRef.close({event: false});
  }
}
