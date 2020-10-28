import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import {JwtHelperService} from '@auth0/angular-jwt';

import { UserService } from './Services/user.service';
import { LogInComponent } from './log-in/log-in.component';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService,
              private jwtHelper: JwtHelperService,
              private dialog: MatDialog) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (this.userService.isLoggedIn && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.userService.logOut();
    this.router.navigate(['/airline']);
    this.openLogInForm();
    return false;
  }

  openLogInForm(): void {
    this.dialog.open(LogInComponent, {
      width: '30em'
    });
  }

}
