import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserForRegistration } from '../Models/UserForRegistration';
import { UserService } from '../Services/user.service';
import { MatchRevealedValidator } from '../Validators/MatchRevealedValidator';

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

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
        firstName: new FormControl(null, [Validators.required, Validators.pattern(this.nameFormat)]),
        lastName: new FormControl(null, [Validators.required, Validators.pattern(this.nameFormat)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required),
        birthDate: new FormControl(null, Validators.required)
      });
    this.userForm.setValidators(MatchRevealedValidator('password', 'confirmPassword'));
  }

  onFormSubmit(): void {
    const user: UserForRegistration = {
      firstName: this.userForm.controls.firstName.value,
      lastName: this.userForm.controls.lastName.value,
      birthDate: this.userForm.controls.birthDate.value,
      email: this.userForm.controls.email.value,
      password: this.userForm.controls.password.value,
      role: 'user'
    };
    this.userService.addUser(user);
  }
}
