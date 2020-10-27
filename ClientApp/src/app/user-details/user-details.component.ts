import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { ResponseModel } from '../Models/ResponseModel';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  constructor(private router: Router,
              public userService: UserService,
              private location: Location,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    const tokenParts = localStorage.getItem('token').split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    this.userService.getUserById(tokenDecoded.sub).subscribe(user => this.user = user);
  }

  save(): void {
    const message = `Are you sure you want to change info in your account?`;

    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.userService.updateUser(this.user);
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
