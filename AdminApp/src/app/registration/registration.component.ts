import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ResponseModel } from '../Models/ResponseModel';
import { PasswordsMatchValidator } from '../Validators/PasswordsMatchValidator';
import { environment } from '../../environments/environment';
import { UserService } from '../Services/user.service';


@Component( {
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
} )
export class RegistrationComponent {

  hide = true;
  confirmHide = true;
  userForm: FormGroup;
  nameFormat = '[a-zA-Z\s]+$';
  maxDate = environment.userMaxBirthDate;
  message: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private location: Location) {
    this.userForm = this.formBuilder.group( {
      firstName: new FormControl( null, [Validators.required, Validators.pattern( this.nameFormat )] ),
      lastName: new FormControl( null, [Validators.required, Validators.pattern( this.nameFormat )] ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      confirmPassword: new FormControl( null, Validators.required ),
      birthDate: new FormControl( null, Validators.required ),
      role: 'admin'
    } );
    this.userForm.setValidators( PasswordsMatchValidator( 'password', 'confirmPassword' ) );
  }

  onFormSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.userService.registerUser( user ).subscribe( response => this.checkResult( response ) );
    }
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

