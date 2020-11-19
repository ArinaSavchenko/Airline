import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private userService: UserService) {
  }

  logOut(): void {
    this.userService.logOut();
  }
}
