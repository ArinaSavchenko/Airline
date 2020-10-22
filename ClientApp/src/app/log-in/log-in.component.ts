import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  userInfo = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(1)])
  });
  hide = true;
  message: string;

 constructor(
   public dialogRef: MatDialogRef<LogInComponent>,
   private userService: UserService) {}

  logIn(): void {
   this.userService.logIn(this.userInfo.value).subscribe(response => this.checkResult(response));
  }

  checkResult(response: Response): void {
   this.closeDialog();
  }

  closeDialog(): void {
   this.dialogRef.close();
  }
}
