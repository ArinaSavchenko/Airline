import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  userInfo = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)])
  });
  hide = true;

 constructor(
    public dialogRef: MatDialogRef<LogInComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
