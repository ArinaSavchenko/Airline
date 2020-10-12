import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
   @Inject(MAT_DIALOG_DATA) public data,
   private userService: UserService) {}

  logIn(): void {
   this.userService.logIn(this.userInfo.value).subscribe(result => this.checkResult(result));
  }

  checkResult(response: Response): void{
   if (response.status === 404){
     this.message = response.statusText;
   }
   else if (response.status % 100 === 2){
     this.closeDialog();
   }
  }

  closeDialog(): void {
   this.dialogRef.close();
  }
}
