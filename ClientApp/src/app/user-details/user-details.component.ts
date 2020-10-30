import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { ResponseModel } from '../Models/ResponseModel';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';
import { UpdateUserModel } from '../Models/UpdateUserModel';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  updateUser: UpdateUserModel;
  userForm: FormGroup;
  nameFormat = '[a-zA-Z\s]+$';
  maxDate = environment.userMaxBirthDate;
  message: string;

  constructor(private router: Router,
              public userService: UserService,
              private location: Location,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user =>
    {
      this.user = user;
      this.userForm = this.formBuilder.group({
        firstName: new FormControl(this.user.firstName, [Validators.required, Validators.pattern(this.nameFormat)]),
        lastName: new FormControl(this.user.lastName, [Validators.required, Validators.pattern(this.nameFormat)]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        birthDate: new FormControl(this.user.birthDate, Validators.required)
      });
    });
  }

  save(): void {
    if (this.userForm.valid) {
      this.updateUser = {
        id: this.user.id,
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        birthDate: this.userForm.controls.birthDate.value,
        email: this.userForm.controls.email.value
      };

      const message = `Are you sure you want to change info in your account?`;

      const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
        data: message
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult.event === true) {
          this.userService.updateUser(this.updateUser).subscribe(response => this.checkResult(response));
        }
      });
    }
  }

  checkResult(response: ResponseModel): void {
    if (response.success === false){
      this.message = response.message;
    }
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/airline/account']);
  }
}
