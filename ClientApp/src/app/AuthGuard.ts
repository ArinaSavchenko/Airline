import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user/user.service';
import { LogInComponent } from './user/log-in/log-in.component';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService,
              private jwtHelper: JwtHelperService,
              private dialog: MatDialog) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (this.userService.isLoggedIn && !this.jwtHelper.isTokenExpired(token) && this.userService.getUserRole() === 'user') {
      return true;
    }

    this.userService.logOut();
    this.openLogInForm();
    return false;
  }

  openLogInForm(): void {
    this.dialog.open(LogInComponent, {
      width: '30em'
    });
  }

}
