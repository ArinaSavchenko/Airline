import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { ResponseModel } from '../../Models/ResponseModel';

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
   public userService: UserService,
   private router: Router) {}

  logIn(): void {
   this.userService.logIn(this.userInfo.value).subscribe(response => this.checkResult(response));
  }

  logOut(): void {
   this.userService.logOut();
   this.closeDialog();
   this.router.navigate(['']);
  }

  checkResult(response: ResponseModel): void {
   if (!response.success){
     this.message = response.message;
   }
   else{
     localStorage.setItem('token', response.data);
     this.closeDialog();
   }
  }

  closeDialog(): void {
   this.dialogRef.close();
  }
}
