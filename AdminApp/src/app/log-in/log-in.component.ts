import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../Services/user.service';
import { ResponseModel } from '../Models/ResponseModel';

@Component( {
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
} )
export class LogInComponent {

  userInfo = new FormGroup( {
    email: new FormControl( null, [Validators.required, Validators.email] ),
    password: new FormControl( null, [Validators.required, Validators.minLength( 1 )] )
  } );
  hide = true;
  message: string;

  constructor(
    public userService: UserService,
    private router: Router) {
  }

  logIn(): void {
    this.userService.logIn( this.userInfo.value ).subscribe( response => this.checkResult( response ) );
  }

  checkResult(response: ResponseModel): void {
    if (!response.success) {
      this.message = response.message;
    } else {
      localStorage.setItem( 'token', response.data );
      this.router.navigate( ['/admin/menu'] );
    }
  }
}
