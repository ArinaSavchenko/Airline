import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterModel } from '../Models/RegisterModel';
// import { UserService } from '../Services/user.service';
import { PasswordsMatchValidator } from '../Validators/PasswordsMatchValidator';
// import { ResponseModel } from '../Models/ResponseModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  hide = true;
  confirmHide = true;
  userForm: FormGroup;
  nameFormat = '[a-zA-Z\s]+$';
  dateNow = new Date();
  maxDate = new Date(new Date(this.dateNow).getTime() - 1000 * 60 * 60 * 24 * 365 * 14);
  message: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.pattern(this.nameFormat)]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern(this.nameFormat)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required)
    });
    this.userForm.setValidators(PasswordsMatchValidator('password', 'confirmPassword'));
  }

  onFormSubmit(): void {
    if (this.userForm.valid) {
      const user: RegisterModel = {
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        birthDate: this.userForm.controls.birthDate.value,
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value,
        role: 'admin'
      };
      // this.userService.register(user).subscribe();
    }
  }

  // checkResult(response: ResponseModel): void {
  //   if (!response.success) {
  //     this.message = response.message;
  //   }
  //   else {
  //     this.goToAccount();
  //   }
  // }

  // goToAccount(): void {
  //   this.router.navigate(['airline/account'], { relativeTo: this.route });
  // }
}

