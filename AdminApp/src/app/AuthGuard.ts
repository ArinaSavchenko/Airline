import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService,
              private jwtHelper: JwtHelperService) {
  }

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
