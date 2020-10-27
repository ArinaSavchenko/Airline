import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { PasswordChangeModel } from '../Models/PasswordChangeModel';
import { ResponseModel } from '../Models/ResponseModel';
import { PasswordsMatchValidator } from '../Validators/PasswordsMatchValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  oldHide = true;
  newHide = true;
  confirmHide = true;
  user: User;
  passwordForm: FormGroup;
  message: string;

  constructor(public userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
    this.passwordForm.setValidators(PasswordsMatchValidator('newPassword', 'confirmPassword'));
  }

  onFormSubmit(): void {
    if (this.passwordForm.valid) {
      const password: PasswordChangeModel = {
        oldPassword: this.passwordForm.controls.oldPassword.value,
        newPassword: this.passwordForm.controls.newPassword.value
      };
      this.userService.changePassword(password).subscribe(response => this.checkResult(response));
    }
  }

  ngOnInit(): void {
    const tokenParts = localStorage.getItem('token').split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    this.userService.getUserById(tokenDecoded.sub).subscribe(user => this.user = user);
  }

  checkResult(response: ResponseModel): void {
    if (!response.success) {
      this.message = response.message;
    }
    else {
      this.goToAccount();
    }
  }

  goToAccount(): void {
    this.router.navigate(['airline/account']);
  }
}
