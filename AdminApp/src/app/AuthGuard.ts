import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './Services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService,
              private jwtHelper: JwtHelperService,
              private dialog: MatDialog) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (this.userService.isLoggedIn && !this.jwtHelper.isTokenExpired(token) && this.userService.getUserRole() === 'admin') {
      return true;
    }

    this.userService.logOut();
    this.router.navigate(['/admin/log-in']);
    return false;
  }
}
