import { Component } from '@angular/core';

import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(public userService: UserService) {
  }

}
