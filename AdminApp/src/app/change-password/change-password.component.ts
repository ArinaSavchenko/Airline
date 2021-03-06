import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { User } from '../Models/User';
import { PasswordChangeModel } from '../Models/PasswordChangeModel';
import { ResponseModel } from '../Models/ResponseModel';
import { PasswordsMatchValidator } from '../Validators/PasswordsMatchValidator';
import { UserService } from '../Services/user.service';

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

  constructor(public userService: UserService,
              private formBuilder: FormBuilder,
              private location: Location) {
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
        userId: this.user.id,
        oldPassword: this.passwordForm.controls.oldPassword.value,
        newPassword: this.passwordForm.controls.newPassword.value
      };
      this.userService.changePassword(password).subscribe(response => this.checkResult(response));
    }
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  checkResult(response: ResponseModel): void {
    if (!response.success) {
      this.message = response.message;
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
