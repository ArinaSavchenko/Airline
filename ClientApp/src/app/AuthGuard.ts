import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from './Services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }

    this.router.navigate(['/airline']);
    return false;
  }


}
